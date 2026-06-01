import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export function MarketingForm() {
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") || "").trim(),
      email: String(fd.get("email") || "").trim(),
      brand: String(fd.get("brand") || "").trim() || null,
      marketing_goals: String(fd.get("marketing_goals") || "").trim(),
      budget: String(fd.get("budget") || "").trim() || null,
      message: String(fd.get("message") || "").trim(),
    };

    if (!payload.name || !payload.email || !payload.marketing_goals || !payload.message) {
      toast.error("Please fill in name, email, goals and message.");
      return;
    }

    setLoading(true);
    const { error } = await supabase.from("marketing_leads").insert(payload);
    setLoading(false);

    if (error) {
      toast.error("Could not send marketing request. Try again.");
      return;
    }

    toast.success("Marketing inquiry sent. We'll follow up soon.");
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

      <label htmlFor="marketing_goals">Marketing Goals</label>
      <input
        id="marketing_goals"
        name="marketing_goals"
        type="text"
        required
        placeholder="Awareness, engagement, or conversion"
      />

      <label htmlFor="budget">Budget Range</label>
      <input id="budget" name="budget" type="text" placeholder="Optional" />

      <label htmlFor="message">Tell us about the campaign</label>
      <textarea
        id="message"
        name="message"
        required
        placeholder="What results are you trying to achieve?"
      />

      <button
        type="submit"
        className="btn-primary"
        disabled={loading}
        style={{ marginTop: "0.5rem" }}
      >
        {loading ? "Sending…" : "Request Strategy"}
      </button>
    </form>
  );
}
