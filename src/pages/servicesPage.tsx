import { MarketingForm } from "@/components/MarketingForm";
import heroImg from "../../images/marketing.jpg";
import serviceSub1 from "../../images/smartphone use.jpg";
import serviceSub2 from "../../images/promotions.jpg";

const items = [
  "Campus Marketing Campaigns",
  "Social Media Marketing",
  "Influencer Marketing",
  "Brand Awareness Campaigns",
  "Event Promotion & Activations",
  "Meta Ads Management",
  "Content Creation",
  "Campus Ambassador Programs",
];

export function ServicesPage() {
  return (
    <main className="tsa-section reveal">
      <div className="section-tag">Services</div>
      <h1 className="section-title">What We Do</h1>

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
            We build youth-led marketing campaigns that move students, spark word-of-mouth, and grow
            brand awareness across campuses and digital communities.
          </p>
          <p>
            Every service is designed for Tanzanian student culture — from launch activations to
            social content, ads, and long-term ambassador programs.
          </p>

          <div style={{ marginTop: "2rem", display: "grid", gap: "1rem", maxWidth: 520 }}>
            <div>
              <strong>Full-service youth marketing</strong>
              <p style={{ color: "#999", marginTop: "0.5rem" }}>
                From strategy to execution, we handle media, creatives, campus engagement, and
                measurement.
              </p>
            </div>
            <div>
              <strong>Flexible campaign support</strong>
              <p style={{ color: "#999", marginTop: "0.5rem" }}>
                Scale a single activation or launch a full semester-long campaign with our student
                network.
              </p>
            </div>
          </div>
        </div>

        <div className="about-visual">
          <div className="main-img">
            <img src={heroImg} alt="Student marketing campaign" loading="lazy" />
          </div>
          <div className="sub-img">
            <img src={serviceSub1} alt="Social media marketing on mobile" loading="lazy" />
          </div>
          <div className="sub-img">
            <img src={serviceSub2} alt="Promotional campaign planning" loading="lazy" />
          </div>
          <div className="about-logo-overlay">
            <img src="/images/logo1.png" alt="The Students Logo" />
          </div>
        </div>
      </section>

      <section style={{ marginTop: "3rem" }}>
        <div style={{ display: "grid", gap: "1.5rem" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
              gap: "1rem",
            }}
          >
            {items.map((item) => (
              <div key={item} className="service-card" style={{ minHeight: "120px" }}>
                <div className="service-title">{item}</div>
                <p className="service-desc" style={{ marginTop: "0.75rem" }}>
                  Trusted support for brands seeking more attention, engagement and relevance among
                  students.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section" style={{ marginTop: "3rem" }}>
        <div className="section-grid">
          <div>
            <h2>Marketing strategy for student audiences</h2>
            <p>
              From campaign goals to budget-friendly execution, we build marketing plans that work
              for youth consumers and university communities.
            </p>
            <p>
              Share your brief and our team will recommend advertising, influencer and content
              strategies designed to create traction among Tanzanian students.
            </p>
          </div>
          <MarketingForm />
        </div>
      </section>
    </main>
  );
}
