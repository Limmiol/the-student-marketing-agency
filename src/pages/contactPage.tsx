import { ContactForm } from "@/components/ContactForm";
import contactImage from "../../images/with heart goal.jpg";
import contactSub1 from "../../images/marketing 2.jpg";
import contactSub2 from "../../images/together.jpg";

export function ContactPage() {
  return (
    <main className="tsa-section reveal">
      <div className="section-tag">Contact</div>
      <h1 className="section-title">Talk to Our Team</h1>

      <section
        className="about"
        style={{
          paddingTop: "2rem",
          paddingBottom: "2rem",
          background: "transparent",
          borderTop: "none",
        }}
      >
        <div className="about-text">
          <p>
            Ready to launch your next student campaign? Send us a message and we’ll help you reach
            Tanzania’s most active youth audiences.
          </p>
          <p>
            We respond quickly to enquiries from brands, event teams, and partners who want a fresh
            approach to campus and social engagement.
          </p>

          <div style={{ display: "grid", gap: "1rem", marginTop: "2rem", maxWidth: 520 }}>
            <div style={{ padding: "1.5rem", borderRadius: 18 }}>
              <strong>Email</strong>
              <p style={{ color: "#999", marginTop: "0.75rem" }}>
                info@studentsmarketingagency.com
              </p>
            </div>
            <div style={{ padding: "1.5rem", borderRadius: 18 }}>
              <strong>Location</strong>
              <p style={{ color: "#999", marginTop: "0.75rem" }}>
                Dar es Salaam, Tanzania — services available nationwide.
              </p>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
              gap: "1rem",
              marginTop: "2rem",
            }}
          >
            <div style={{ padding: "1.5rem", borderRadius: 18 }}>
              <strong>Response time</strong>
              <p style={{ color: "#999", marginTop: "0.75rem" }}>
                Most enquiries are answered within 24-48 hours.
              </p>
            </div>
            <div style={{ padding: "1.5rem", borderRadius: 18 }}>
              <strong>What to send</strong>
              <p style={{ color: "#999", marginTop: "0.75rem" }}>
                Your brand, campaign goals, ideal student audience, and launch dates.
              </p>
            </div>
          </div>
        </div>

        <div className="about-visual">
          <div className="main-img">
            <img src={contactImage} alt="Team collaboration and outreach" loading="lazy" />
          </div>
          <div className="sub-img">
            <img src={contactSub1} alt="Marketing planning for a youth audience" loading="lazy" />
          </div>
          <div className="sub-img">
            <img src={contactSub2} alt="Students working together" loading="lazy" />
          </div>
          <div className="about-logo-overlay">
            <img src="/images/logo1.png" alt="The Students Logo" />
          </div>
        </div>
      </section>

      <section className="tsa-section" style={{ marginTop: "3rem" }}>
        <div className="section-tag">Send us a brief</div>
        <div style={{ maxWidth: 760, marginTop: "1.5rem" }}>
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
