import { EventForm } from "@/components/EventForm";
import eventHero from "../../images/clubing.jpg";
import eventGallery from "../../images/birthday parties.jpg";
import eventCampus from "../../images/together.jpg";
import eventLaunch from "../../images/parties.jpg";
import eventActivation from "../../images/promotions.jpg";

export function EventsPage() {
  return (
    <main className="tsa-section reveal">
      <section
        className="about"
        style={{ paddingTop: 0, paddingBottom: 0, background: "transparent", borderTop: "none" }}
      >
        <div>
          <p className="section-tag">Events + Experiences</p>
          <h1 className="hero-heading" style={{ marginBottom: "1.5rem" }}>
            Launch days to campus takeovers.
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

      <section className="tsa-section" style={{ paddingTop: "0", paddingBottom: "3rem" }}>
        <div style={{ display: "grid", gap: "1.5rem" }}>
          <div>
            <div className="section-tag">Sample Events</div>
            <h2 className="section-title">Live activations that build buzz and brand momentum.</h2>
          </div>
          <div className="event-card-grid">
            <article className="event-card">
              <div className="event-card-media">
                <img src={eventCampus} alt="Students at campus event" />
                <span className="event-card-badge">Campus Takeover</span>
              </div>
              <div className="event-card-copy">
                <h3>Campus takeover</h3>
                <p>
                  High-energy student activations with on-site sampling, performances, and social
                  buzz that bring your brand directly into campus life.
                </p>
              </div>
            </article>
            <article className="event-card event-card--accent">
              <div className="event-card-media">
                <img src={eventLaunch} alt="Launch party activation" />
                <span className="event-card-badge">Launch Party</span>
              </div>
              <div className="event-card-copy">
                <h3>Launch party</h3>
                <p>
                  A standout product or campaign launch with influencers, live content, and brand
                  storytelling designed to create momentum.
                </p>
              </div>
            </article>
            <article className="event-card">
              <div className="event-card-media">
                <img src={eventActivation} alt="Brand activation experience" />
                <span className="event-card-badge">Brand Activation</span>
              </div>
              <div className="event-card-copy">
                <h3>Brand activation</h3>
                <p>
                  Interactive experiences that turn awareness into action with branded moments, demo
                  zones, and audience engagement.
                </p>
              </div>
            </article>
          </div>
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
