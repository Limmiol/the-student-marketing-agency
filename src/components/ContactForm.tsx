import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export function ContactForm() {
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") || "").trim(),
      email: String(fd.get("email") || "").trim(),
      brand: String(fd.get("brand") || "").trim() || null,
      message: String(fd.get("message") || "").trim(),
    };

    if (!payload.name || !payload.email || !payload.message) {
      toast.error("Please fill in name, email and message.");
      return;
    }

    setLoading(true);
    const { error } = await supabase.from("contact_leads").insert(payload);
    setLoading(false);

    if (error) {
      toast.error("Could not send. Try again.");
      return;
    }

    toast.success("Thanks — we'll be in touch soon.");
    (e.target as HTMLFormElement).reset();
  }

  return (
    <form className="contact-form" onSubmit={onSubmit}>
      <label htmlFor="name">Name</label>
      <input id="name" name="name" type="text" required placeholder="Your full name" />

      <label htmlFor="email">Email</label>
      <input id="email" name="email" type="email" required placeholder="you@brand.com" />

      <label htmlFor="brand">Brand / Company</label>
      <input id="brand" name="brand" type="text" placeholder="Optional" />

      <label htmlFor="message">Tell us about your campaign</label>
      <textarea id="message" name="message" required placeholder="What are you trying to launch?" />

      <button
        type="submit"
        className="btn-primary"
        disabled={loading}
        style={{ marginTop: "0.5rem" }}
      >
        {loading ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
