import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const eventTypes = [
  "Campus Activation",
  "Brand Launch",
  "Competition / Challenge",
  "Influencer Meet-up",
  "Product Sampling",
  "Entertainment Event",
];

export function EventForm() {
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") || "").trim(),
      email: String(fd.get("email") || "").trim(),
      brand: String(fd.get("brand") || "").trim() || null,
      event_type: String(fd.get("event_type") || "").trim(),
      event_date: String(fd.get("event_date") || "").trim() || null,
      attendees: String(fd.get("attendees") || "").trim() || null,
      message: String(fd.get("message") || "").trim(),
    };

    if (!payload.name || !payload.email || !payload.event_type || !payload.message) {
      toast.error("Please fill in name, email, event type and message.");
      return;
    }

    setLoading(true);
    const { error } = await supabase.from("event_leads").insert(payload);
    setLoading(false);

    if (error) {
      toast.error("Could not send event details. Try again.");
      return;
    }

    toast.success("Event request submitted. We'll reach out soon.");
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

      <label htmlFor="event_type">Event Type</label>
      <select id="event_type" name="event_type" required defaultValue="">
        <option value="" disabled>
          Select event type
        </option>
        {eventTypes.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>

      <label htmlFor="event_date">Preferred Date</label>
      <input id="event_date" name="event_date" type="date" />

      <label htmlFor="attendees">Estimated Attendees</label>
      <input id="attendees" name="attendees" type="text" placeholder="e.g. 200+ students" />

      <label htmlFor="message">Tell us about the event</label>
      <textarea
        id="message"
        name="message"
        required
        placeholder="What are your goals and activation needs?"
      />

      <button
        type="submit"
        className="btn-primary"
        disabled={loading}
        style={{ marginTop: "0.5rem" }}
      >
        {loading ? "Sending…" : "Plan Event"}
      </button>
    </form>
  );
}
