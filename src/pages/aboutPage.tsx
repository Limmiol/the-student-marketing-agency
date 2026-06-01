import aboutMain from "../../images/african college students.jpg";
import aboutSub1 from "../../images/group work.jpg";
import aboutSub2 from "../../images/happy college.jpg";

export function AboutPage() {
  return (
    <main className="tsa-section reveal">
      <div className="section-tag">About</div>
      <h1 className="section-title">About The Students Marketing Agency</h1>

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
            We are Tanzania’s youth-first marketing agency, connecting brands with university
            students and Gen Z consumers through bold digital campaigns, campus activations, and
            creator-led storytelling.
          </p>
          <p>
            Our work is rooted in student culture, trends, and real campus life — so every message
            lands with authenticity, energy, and measurable impact.
          </p>
          <div style={{ marginTop: "2rem", display: "grid", gap: "1rem", maxWidth: 520 }}>
            <div>
              <strong>Our mission</strong>
              <p style={{ color: "#999", marginTop: "0.5rem" }}>
                To help brands build meaningful connections with Tanzania’s next generation of
                consumers and creators.
              </p>
            </div>
            <div>
              <strong>How we work</strong>
              <p style={{ color: "#999", marginTop: "0.5rem" }}>
                We blend campus activations, social strategy, influencer partnerships, and fresh
                content to keep campaigns relevant and memorable.
              </p>
            </div>
          </div>
        </div>

        <div className="about-visual">
          <div className="main-img">
            <img src={aboutMain} alt="Students collaborating on a campaign" loading="lazy" />
          </div>
          <div className="sub-img">
            <img src={aboutSub1} alt="Campus activation in Tanzania" loading="lazy" />
          </div>
          <div className="sub-img">
            <img src={aboutSub2} alt="Student engagement and events" loading="lazy" />
          </div>
          <div className="about-logo-overlay">
            <img src="/images/logo1.png" alt="The Students Logo" />
          </div>
        </div>
      </section>

      <section style={{ marginTop: "3rem", display: "grid", gap: "2rem", maxWidth: 900 }}>
        <div>
          <h2 style={{ fontSize: "1.8rem", fontWeight: 800, marginBottom: "1rem" }}>
            Built for students, by students.
          </h2>
          <p style={{ color: "#999", lineHeight: 1.8 }}>
            From university events to social-first campaigns, our team lives the culture we help
            brands speak to. We make every campaign feel native, exciting and highly shareable.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1rem",
          }}
        >
          <div style={{ padding: "1.5rem", borderRadius: 18 }}>
            <strong>Campus-first strategy</strong>
            <p style={{ color: "#999", marginTop: "0.75rem" }}>
              We design campaigns for the places students live, learn, and hang out — online and on
              campus.
            </p>
          </div>
          <div style={{ padding: "1.5rem", borderRadius: 18 }}>
            <strong>Creative storytelling</strong>
            <p style={{ color: "#999", marginTop: "0.75rem" }}>
              Our content helps brands stand out with visuals, video, and messaging that resonate
              with youth.
            </p>
          </div>
          <div style={{ padding: "1.5rem", borderRadius: 18 }}>
            <strong>Measured performance</strong>
            <p style={{ color: "#999", marginTop: "0.75rem" }}>
              We track engagement, conversions and campaign reach so every project is driven by real
              results.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
