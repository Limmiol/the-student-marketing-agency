import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { toast, Toaster } from "sonner";
import {
  School,
  Smartphone,
  Star,
  Megaphone,
  PartyPopper,
  Facebook,
  Video,
  Users,
  Brain,
  Network,
  Lightbulb,
  BarChart3,
  Sparkles,
  Rocket,
  Wifi,
  Landmark,
  Shirt,
  Sparkle,
  UtensilsCrossed,
  GlassWater,
  Cpu,
  Music,
  Trophy,
  Mail,
  Instagram,
  MapPin,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { ContactForm } from "@/components/ContactForm";
import heroImg from "../../images/african college students.jpg";

const SITE_IMAGES_BUCKET = "site-images";
const img = (path: string) =>
  supabase.storage.from(SITE_IMAGES_BUCKET).getPublicUrl(path).data.publicUrl;

const aboutMain = img("about-main.jpg");
const aboutSub1 = img("about-sub1.jpg");
const aboutSub2 = img("about-sub2.jpg");

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "The Students Marketing Agency — Tanzania's Youth Marketing Agency" },
      {
        name: "description",
        content:
          "We connect brands with Gen Z and university students across Tanzania through digital campaigns, campus activations, and influencer marketing.",
      },
      { property: "og:title", content: "The Students Marketing Agency" },
      { property: "og:description", content: "Tanzania's leading youth marketing agency." },
      { property: "og:image", content: heroImg },
    ],
  }),
});

const services = [
  {
    icon: School,
    title: "Campus Marketing Campaigns",
    desc: "Targeted campaigns and activations that reach university students where they live, study, and socialise.",
  },
  {
    icon: Smartphone,
    title: "Social Media Marketing",
    desc: "Engaging strategies that increase visibility, engagement, and brand growth across all platforms.",
  },
  {
    icon: Star,
    title: "Influencer Marketing",
    desc: "Connecting brands with student influencers and youth creators for authentic, high-impact campaigns.",
  },
  {
    icon: Megaphone,
    title: "Brand Awareness Campaigns",
    desc: "Building strong brand recognition among young consumers who represent tomorrow's buying power.",
  },
  {
    icon: PartyPopper,
    title: "Event Promotion & Activations",
    desc: "Organising and promoting student events, product launches, competitions, and experiential campaigns.",
  },
  {
    icon: Facebook,
    title: "Meta Ads Management",
    desc: "High-converting Facebook and Instagram advertising campaigns focused on youth audiences.",
  },
  {
    icon: Video,
    title: "Content Creation",
    desc: "Reels, TikTok videos, graphic designs, promotional videos, and viral content campaigns.",
  },
  {
    icon: Users,
    title: "Campus Ambassador Programs",
    desc: "Recruiting and managing student ambassadors across universities to grow brand presence nationwide.",
  },
];

const why = [
  {
    badge: "Expertise",
    icon: Brain,
    title: "Youth Market Experts",
    desc: "We understand student behaviour, trends, digital culture, and youth engagement better than any traditional agency. We live it.",
  },
  {
    badge: "Reach",
    icon: Network,
    title: "Strong Student Network",
    desc: "Our network gives brands direct access to highly engaged university audiences across Tanzania — a market growing fast.",
  },
  {
    badge: "Creative",
    icon: Lightbulb,
    title: "Modern & Innovative",
    desc: "We create campaigns that connect with Gen Z audiences authentically, using formats and platforms they actually use and trust.",
  },
  {
    badge: "Performance",
    icon: BarChart3,
    title: "Results-Driven",
    desc: "Everything we do is tied to measurable growth — engagement, visibility, and campaign performance you can actually track.",
  },
  {
    badge: "Strategy",
    icon: Sparkles,
    title: "Digital-First Approach",
    desc: "Combining social media, influencer marketing, and campus activations for 360° impact on audiences that matter most.",
  },
  {
    badge: "Mission",
    icon: Rocket,
    title: "Student Empowerment",
    desc: "We don't just market — we create real opportunities for students and young creators, building the ecosystem from within.",
  },
];

const values = [
  {
    name: "Innovation",
    desc: "Creative and modern marketing solutions that push what's possible in youth engagement.",
  },
  {
    name: "Integrity",
    desc: "Professionalism, honesty, and transparency in every brand partnership we build.",
  },
  {
    name: "Excellence",
    desc: "High-quality campaigns and measurable results that brands can consistently rely on.",
  },
  {
    name: "Empowerment",
    desc: "Real opportunities for students and young creators — not just consuming them.",
  },
  {
    name: "Collaboration",
    desc: "Strong partnerships with brands, universities, and communities across Tanzania.",
  },
];

const industries = [
  { icon: Wifi, label: "Telecom Companies" },
  { icon: Landmark, label: "Banks & Fintech" },
  { icon: Shirt, label: "Fashion Brands" },
  { icon: Sparkle, label: "Beauty Brands" },
  { icon: UtensilsCrossed, label: "Restaurants & Food Delivery" },
  { icon: GlassWater, label: "Beverage Companies" },
  { icon: Cpu, label: "Technology Startups" },
  { icon: School, label: "Education Platforms" },
  { icon: Music, label: "Entertainment Brands" },
  { icon: Trophy, label: "Sports & Betting" },
];

const marqueeItems = [
  "Campus Marketing",
  "Social Media",
  "Influencer Marketing",
  "Brand Awareness",
  "Event Activations",
  "Meta Ads",
  "Content Creation",
  "Ambassador Programs",
];

function Index() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        }
      },
      { threshold: 0.12 },
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <Toaster theme="dark" position="top-right" />

      <header className="hero" id="home">
        <div className="hero-bg" />
        <div className="hero-left reveal">
          <div className="hero-eyebrow">Tanzania's Youth Marketing Agency</div>
          <h1>
            We Connect
            <br />
            Brands With
            <br />
            <em>GenZ.</em>
          </h1>
          <p className="hero-tagline">
            Helping brands reach Gen Z and university students across Tanzania through digital
            campaigns, campus activations, and influencer marketing.
          </p>
          <div className="hero-actions">
            <a href="/services" className="btn-primary">
              View Our Services
            </a>
            <a href="/contact" className="btn-outline">
              Work With Us
            </a>
          </div>
        </div>
        <div className="hero-right reveal">
          <div className="hero-img-frame">
            <img src={heroImg} alt="The Students Team" width={1024} height={1024} />
            <div className="hero-img-badge">
              <span>Gen Z</span>Marketing Agency
            </div>
            <div className="hero-img-overlay-logo">
              <img src="/images/logo1.png" alt="The Students Logo" />
            </div>
          </div>
        </div>
      </header>

      <div className="marquee-wrap">
        <div className="marquee-inner reveal">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i}>
              {item}
              <span className="dot" style={{ marginLeft: "2.5rem" }}>
                ✦
              </span>
            </span>
          ))}
        </div>
      </div>

      <section className="tsa-section about" id="about">
        <div className="about-text reveal">
          <div className="section-tag">About Us</div>
          <h2 className="section-title">
            Youth-Driven.
            <br />
            <em>Results-Led.</em>
          </h2>
          <p>
            The Students Marketing Agency is a youth-driven marketing and media company focused on
            helping brands connect directly with university students and Gen Z consumers across
            Tanzania.
          </p>
          <p>
            We bridge the gap between brands and the fastest-growing consumer market in Africa — the
            youth — through digital campaigns, campus activations, and student engagement
            strategies.
          </p>
        </div>
        <div className="about-visual reveal">
          <div className="main-img">
            <img src={aboutMain} alt="The Students Agency" loading="lazy" />
          </div>
          <div className="sub-img">
            <img src={aboutSub1} alt="Campus Activation" loading="lazy" />
          </div>
          <div className="sub-img">
            <img src={aboutSub2} alt="Student Network" loading="lazy" />
          </div>
          <div className="about-logo-overlay">
            <img src="/images/logo1.png" alt="The Students Logo" />
          </div>
          <div className="about-stats">
            <div className="stat">
              <div className="stat-num">
                Gen<span>Z</span>
              </div>
              <div className="stat-label">Audience Focus</div>
            </div>
            <div className="stat">
              <div className="stat-num">
                8<span>+</span>
              </div>
              <div className="stat-label">Core Services</div>
            </div>
            <div className="stat">
              <div className="stat-num">
                10<span>+</span>
              </div>
              <div className="stat-label">Industries</div>
            </div>
            <div className="stat">
              <div className="stat-num">
                TZ<span>.</span>
              </div>
              <div className="stat-label">Based in Tanzania</div>
            </div>
          </div>
        </div>
      </section>

      <section className="tsa-section" id="services" style={{ background: "var(--bg)" }}>
        <div className="services-header">
          <div>
            <div className="section-tag">What We Do</div>
            <h2 className="section-title">
              Our <em>Services</em>
            </h2>
          </div>
          <a href="/contact" className="btn-outline">
            Start a Project →
          </a>
        </div>
        <div className="services-grid reveal">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <div className="service-card" key={i}>
                <div className="service-num">{String(i + 1).padStart(2, "0")}</div>
                <Icon className="service-icon" size={28} />
                <div className="service-title">{s.title}</div>
                <p className="service-desc">{s.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="tsa-section" id="why" style={{ background: "var(--bg)" }}>
        <div className="section-tag">Why Choose Us</div>
        <h2 className="section-title">
          Built for the
          <br />
          <em>Next Generation.</em>
        </h2>
        <div className="why-grid reveal">
          {why.map((w, i) => {
            const Icon = w.icon;
            return (
              <div className="why-card" key={i}>
                <div className="badge">{w.badge}</div>
                <Icon className="why-icon" size={26} />
                <div className="why-title">{w.title}</div>
                <p className="why-desc">{w.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="tsa-section" id="values" style={{ background: "var(--surface)" }}>
        <div className="section-tag">Our Values</div>
        <h2 className="section-title">
          What We
          <br />
          <em>Stand For.</em>
        </h2>
        <div className="values-list reveal">
          {values.map((v, i) => (
            <div className="value-item" key={i}>
              <div className="value-num">{String(i + 1).padStart(2, "0")}</div>
              <div className="value-name">{v.name}</div>
              <p className="value-desc">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="tsa-section" id="industries" style={{ background: "var(--bg)" }}>
        <div className="section-tag">Industries</div>
        <h2 className="section-title">
          Who We
          <br />
          <em>Work With.</em>
        </h2>
        <div className="tag-cloud">
          {industries.map((t, i) => {
            const Icon = t.icon;
            return (
              <div className="tag" key={i}>
                <Icon size={16} /> {t.label}
              </div>
            );
          })}
        </div>
      </section>

      <section className="cta-section reveal" id="contact">
        <div className="cta-left">
          <div className="section-tag">Get Started</div>
          <h2>
            Ready to Reach
            <br />
            The Next
            <br />
            Generation?
          </h2>
          <p>
            Partner with Tanzania's leading youth marketing agency and connect your brand to the
            power of students.
          </p>
        </div>
        <ContactForm />
      </section>
    </>
  );
}
