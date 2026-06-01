import React, { useState } from "react";
import { toast } from "sonner";
import { Link, Navigate, useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import bg from "../../images/african college students.jpg";

export function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  if (!authLoading && user) {
    return <Navigate to="/profile" />;
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email") || "").trim();
    const password = String(fd.get("password") || "");
    const name = String(fd.get("name") || "").trim();

    if (!email || !password || !name) {
      toast.error("Please provide name, email and password.");
      return;
    }

    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        },
      },
    });
    setLoading(false);

    if (error) {
      toast.error(error.message || "Registration failed.");
      return;
    }

    toast.success("Registration successful. Check your email to confirm your account.");

    // Create a minimal profile record for this user (if the profiles table exists)
    try {
      const createdUserId = (data as any)?.user?.id;
      if (createdUserId) {
        const { error: profileError } = await supabase
          .from("profiles")
          .upsert(
            {
              id: createdUserId,
              full_name: name,
              email,
            },
            { onConflict: "id" }
          );

        if (profileError) {
          toast.error(profileError.message || "Could not create profile record.");
        } else {
          toast.success("Profile record created.");
        }
      }
    } catch (err) {
      toast.error((err as Error).message || "Profile creation failed.");
    }

    if (data?.session) {
      navigate({ to: "/profile" });
    } else {
      navigate({ to: "/login" });
    }
  }

  return (
    <main className="auth-page" style={{ backgroundImage: `url(${bg})` }}>
      <div className="auth-card">
        <h2>Create Account</h2>
        <form onSubmit={onSubmit}>
          <label htmlFor="name">Name</label>
          <input id="name" name="name" type="text" placeholder="Your full name" />

          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" placeholder="you@brand.com" />

          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" placeholder="Password" />

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Registering…" : "Register"}
          </button>
        </form>
        <p className="auth-switch">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </main>
  );
}
