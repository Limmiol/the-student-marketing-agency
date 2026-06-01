import React, { useEffect, useState } from "react";
import { Link, Navigate } from "@tanstack/react-router";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase, isSupabaseMockRuntime } from "@/integrations/supabase/client";
import { toast } from "sonner";

export function ProfilePage() {
  const { user, loading, signOut } = useAuth();
  const qc = useQueryClient();

  const [editing, setEditing] = useState(false);
  const [fullName, setFullName] = useState("");
  const [plan, setPlan] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);


  // Fetch profile via effect instead of react-query to avoid hook-order issues
  const [profile, setProfile] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(!!user);
  const [profileError, setProfileError] = useState<any | null>(null);

  async function refetch() {
    if (!user) return null;
    setIsLoading(true);
    try {
      const { data, error } = await supabase.from("profiles").select("*").eq("id", user.id).maybeSingle();
      if (error) {
        setProfileError(error);
        setProfile(null);
        return null;
      }
      setProfile(data || null);
      setProfileError(null);
      return data || null;
    } catch (err) {
      setProfileError(err);
      setProfile(null);
      return null;
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    let mounted = true;
    if (!user) {
      setProfile(null);
      setIsLoading(false);
      return;
    }
    refetch();
    return () => {
      mounted = false;
    };
  }, [user]);

  const profileErrorMessage = String(profileError?.message || profileError || "");
  const missingProfilesTable =
    profileErrorMessage.includes("Could not find the table 'public.profiles'") ||
    profileErrorMessage.includes("Could not find the table 'public.profiles' in the schema cache") ||
    profileErrorMessage.includes('relation "profiles" does not exist') ||
    profileErrorMessage.includes('table "profiles" does not exist');

  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name || "");
      setPlan(profile.plan || "");
      setAvatarUrl(profile.avatar_url || null);
    } else if (user) {
      setFullName((user.user_metadata as any)?.full_name || "");
      setPlan("");
    }
  }, [profile, user]);

  async function saveProfile(e?: React.FormEvent) {
    e?.preventDefault();
    if (!user) return;
    if (missingProfilesTable) {
      toast.error("Profile database unavailable. Contact your administrator.");
      return;
    }
    const { error } = await supabase.from("profiles").upsert({ id: user.id, full_name: fullName, plan, email: user.email }, { onConflict: "id" });
    if (error) {
      toast.error(error.message || "Could not save profile.");
      return;
    }
    toast.success("Profile saved.");
    setEditing(false);
    await refetch();
    qc.invalidateQueries(["profile", user.id]);
  }

  async function uploadAvatar() {
    if (!user || !avatarFile) return;
    setUploading(true);
    try {
      // Resize large images in the browser to reduce upload size
      async function resizeImageFile(file: File, maxSize = 1024): Promise<File> {
        return new Promise((resolve, reject) => {
          const img = new Image();
          const url = URL.createObjectURL(file);
          img.onload = () => {
            let { width, height } = img;
            let ratio = 1;
            if (width > height) {
              if (width > maxSize) ratio = maxSize / width;
            } else {
              if (height > maxSize) ratio = maxSize / height;
            }
            const canvas = document.createElement("canvas");
            canvas.width = Math.round(width * ratio);
            canvas.height = Math.round(height * ratio);
            const ctx = canvas.getContext("2d");
            if (!ctx) return reject(new Error("Canvas not supported"));
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            canvas.toBlob(
              (blob) => {
                if (!blob) return reject(new Error("Canvas is empty"));
                const resizedFile = new File([blob], file.name, { type: blob.type });
                URL.revokeObjectURL(url);
                resolve(resizedFile);
              },
              file.type || "image/jpeg",
              0.85
            );
          };
          img.onerror = () => {
            URL.revokeObjectURL(url);
            reject(new Error("Image load error"));
          };
          img.src = url;
        });
      }

      let fileToUpload: File = avatarFile;
      // If larger than 200KB, resize client-side
      if (avatarFile.size > 200 * 1024) {
        try {
          fileToUpload = await resizeImageFile(avatarFile, 1024);
        } catch (err) {
          // If resizing fails, fall back to original file
          console.warn("Image resize failed, uploading original", err);
          fileToUpload = avatarFile;
        }
      }

      const path = `avatars/${user.id}/${Date.now()}_${fileToUpload.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(path, fileToUpload, { upsert: false });

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage.from("avatars").getPublicUrl(uploadData.path);
      const publicUrl = urlData?.publicUrl || null;

      if (publicUrl) {
        if (missingProfilesTable) {
          throw new Error("Profile database unavailable.");
        }
        const { error: upsertError } = await supabase.from("profiles").upsert({ id: user.id, avatar_url: publicUrl }, { onConflict: "id" });
        if (upsertError) throw upsertError;
        setAvatarUrl(publicUrl);
        toast.success("Avatar uploaded.");
        await refetch();
        qc.invalidateQueries(["profile", user.id]);
      }
    } catch (err) {
      toast.error((err as Error).message || "Avatar upload failed.");
    } finally {
      setUploading(false);
      setAvatarFile(null);
    }
  }

  if (loading || isLoading) {
    return (
      <main className="page-shell auth-page">
        <div className="auth-card">
          <h2>Loading your account…</h2>
        </div>
      </main>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <main className="page-shell profile-page">
      <section className="profile-card">
        <div className="profile-header">
          <div>
            <h1>Welcome back</h1>
            <p>Here is your account summary.</p>
          </div>
          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            {editing ? (
                <button className="btn-primary" onClick={saveProfile} disabled={missingProfilesTable && !isSupabaseMockRuntime()}>
                Save
              </button>
            ) : (
              <button className="btn-primary" onClick={() => setEditing(true)} disabled={missingProfilesTable && !isSupabaseMockRuntime()}>
                Edit
              </button>
            )}
            <button className="btn-secondary" onClick={async () => await signOut()}>
              Logout
            </button>
            {missingProfilesTable ? (
              <span className="profile-note">Profile database unavailable. Save is disabled.</span>
            ) : null}
          </div>
        </div>
        {missingProfilesTable ? (
          <section className="dashboard-note profile-warning">
            <p className="dashboard-warning-title">Profile database unavailable</p>
            <p>
              Your account is authenticated, but Supabase cannot access the `public.profiles` table. Profile persistence is disabled until the database schema is installed.
            </p>
          </section>
        ) : null}

        <form onSubmit={saveProfile}>
          <div className="profile-body">
            <div>
              <strong>Avatar</strong>
              <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                <img
                  src={avatarUrl || profile?.avatar_url || "/images/avatar-placeholder.png"}
                  alt="avatar"
                  style={{ width: 64, height: 64, borderRadius: 8, objectFit: "cover" }}
                />
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setAvatarFile(e.target.files && e.target.files[0] ? e.target.files[0] : null)}
                  />
                  <div style={{ marginTop: 6 }}>
                    <button
                      className="btn-primary"
                      type="button"
                      onClick={uploadAvatar}
                      disabled={(missingProfilesTable && !isSupabaseMockRuntime()) || !avatarFile || uploading}
                    >
                      {uploading ? "Uploading…" : "Upload avatar"}
                    </button>
                    {missingProfilesTable && !isSupabaseMockRuntime() ? (
                      <p className="profile-note">Avatar upload is disabled until profiles schema exists.</p>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
            <div>
              <strong>Name</strong>
              {editing ? (
                <input value={fullName} onChange={(e) => setFullName(e.target.value)} />
              ) : (
                <p>{fullName || "Student"}</p>
              )}
            </div>
            <div>
              <strong>Email</strong>
              <p>{user.email}</p>
            </div>
            <div>
              <strong>Plan</strong>
              {editing ? (
                <input value={plan} onChange={(e) => setPlan(e.target.value)} placeholder="Plan name" />
              ) : (
                <p>{plan || "Student growth bundle"}</p>
              )}
            </div>
            <div>
              <strong>User ID</strong>
              <p>{user.id}</p>
            </div>
          </div>
        </form>

        <div className="profile-actions">
          <Link to="/">Back to home</Link>
        </div>
      </section>
    </main>
  );
}
