import { EventForm } from "@/components/EventForm";
import eventHero from "../../images/clubing.jpg";
import eventGallery from "../../images/birthday parties.jpg";

export function EventsPage() {
  return (
    <main className="tsa-section reveal">
      <section
        className="about"
        style={{ paddingTop: 0, paddingBottom: 0, background: "transparent", borderTop: "none" }}
      >
        <div>
          <p className="section-tag">Events + Experiences</p>
          <h1 style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", marginBottom: "1.5rem" }}>
            From launch days to campus takeovers, we craft experiences that connect.
          </h1>
          <p>
            Brand activations, event marketing, and live campaigns built for unforgettable reach
            across Africa.
          </p>
        </div>
        <div className="about-visual" style={{ background: "transparent" }}>
          <div className="main-img" style={{ minHeight: "360px" }}>
            <img src={eventHero} alt="Brand event experience" />
          </div>
        </div>
      </section>

      <section className="tsa-section" style={{ paddingTop: "3rem", paddingBottom: "3rem" }}>
        <div style={{ display: "grid", gap: "2rem" }}>
          <article>
            <h2>Strategy-led event execution</h2>
            <p>
              We plan every detail from audience research, local partner sourcing, venue logistics,
              activations, to post-event tracking. The goal is always a strong brand impression and
              measurable response.
            </p>
          </article>
          <article>
            <h3>We support</h3>
            <ul>
              <li>Experiential brand launches</li>
              <li>Student and campus programs</li>
              <li>Influencer meet-ups & pop-ups</li>
              <li>Sampling campaigns with real-time analytics</li>
            </ul>
          </article>
        </div>
      </section>

      <section
        className="about"
        style={{ paddingTop: 0, paddingBottom: 0, background: "transparent", borderTop: "none" }}
      >
        <div>
          <h2>Event planning built for growth</h2>
          <p>
            Whether you're rolling out a product, building grassroots awareness, or creating a
            loyalty moment, our campaigns focus on creative value and reliable execution.
          </p>
          <p>
            Submit your event brief and we'll follow up with a proposal tailored to your audience,
            scope, and budget.
          </p>
        </div>
        <div className="about-visual" style={{ background: "transparent" }}>
          <div className="main-img" style={{ minHeight: "240px" }}>
            <img src={eventGallery} alt="Event planning and branded party" />
          </div>
        </div>
      </section>

      <section className="tsa-section" style={{ paddingTop: "3rem", paddingBottom: "0" }}>
        <div style={{ display: "grid", gap: "2rem" }}>
          <div>
            <h3>Let's plan your next activation</h3>
            <p>
              Fill in the details and a specialist will contact you with the right format, pricing,
              and timeline.
            </p>
          </div>
          <EventForm />
        </div>
      </section>
    </main>
  );
}
