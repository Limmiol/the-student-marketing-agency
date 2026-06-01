import React, { useState } from "react";
import { toast } from "sonner";
import { Link, Navigate, useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import bg from "../../images/african college students.jpg";

export function LoginPage() {
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

    if (!email || !password) {
      toast.error("Please provide email and password.");
      return;
    }

    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);

    if (error) {
      toast.error(error.message || "Sign in failed.");
      return;
    }

    if (data?.session) {
      toast.success("Signed in successfully.");
      navigate({ to: "/profile" });
    } else {
      toast.success("Sign in successful. Complete any confirmation steps and return to login.");
    }
  }

  return (
    <main className="auth-page" style={{ backgroundImage: `url(${bg})` }}>
      <div className="auth-card">
        <h2>Sign In</h2>
        <form onSubmit={onSubmit}>
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" placeholder="you@brand.com" />

          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" placeholder="Password" />

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
        <p className="auth-switch">
          Don’t have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </main>
  );
}
