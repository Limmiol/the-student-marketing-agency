import fs from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";

function parseDotEnv(content) {
  return Object.fromEntries(
    content
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith("#"))
      .map((line) => {
        const index = line.indexOf("=");
        const key = line.slice(0, index).trim();
        const value = line.slice(index + 1).trim().replace(/^"|"$/g, "");
        return [key, value];
      }),
  );
}

const envFile = path.resolve(process.cwd(), ".env");
const env = fs.existsSync(envFile) ? parseDotEnv(fs.readFileSync(envFile, "utf8")) : {};
const SUPABASE_URL = process.env.SUPABASE_URL || env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL) {
  console.error("Missing SUPABASE_URL. Set it in your environment or .env file.");
  process.exit(1);
}

if (!SUPABASE_SERVICE_ROLE_KEY) {
  console.error("Missing SUPABASE_SERVICE_ROLE_KEY. Set it in your environment or .env file.");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: {
    storage: undefined,
    persistSession: false,
    autoRefreshToken: false,
  },
});

async function ensureAvatarsBucket() {
  console.log("Ensuring avatars storage bucket exists...");
  const { data, error } = await supabase.storage.createBucket("avatars", { public: true });
  if (error) {
    if (error.message?.includes("already exists")) {
      console.log("Avatars bucket already exists.");
      return;
    }
    throw error;
  }
  console.log("Created avatars bucket.", data);
}

async function seedLeads() {
  console.log("Seeding lead tables...");

  const contactLeads = [
    {
      name: "Amina Mwanga",
      email: "amina@campusvibes.tz",
      brand: "Campus Vibes",
      message: "Interested in a student launch campaign for our new mobile app.",
    },
    {
      name: "Samson K",
      email: "samson@fashco.tz",
      brand: "FashCo",
      message: "Looking to plan a campus pop-up event in Dar es Salaam.",
    },
  ];

  const eventLeads = [
    {
      name: "Fatuma Juma",
      email: "fatuma@edutech.tz",
      brand: "EduTech",
      event_type: "Campus Activation",
      event_date: "2026-09-17",
      attendees: "300",
      message: "Need support promoting a student recruitment fair.",
    },
    {
      name: "Elijah N",
      email: "elijah@tastebud.tz",
      brand: "TasteBud",
      event_type: "Product Launch Party",
      event_date: "2026-10-05",
      attendees: "180",
      message: "We want to bring our new beverage to university students.",
    },
  ];

  const marketingLeads = [
    {
      name: "Zuri Mwinyi",
      email: "zuri@fintech.tz",
      brand: "Fintech Hub",
      marketing_goals: "Generate signups among university students and young professionals",
      budget: "2500000",
      message: "We need a youth-focused digital campaign with measurable results.",
    },
    {
      name: "Hassan M",
      email: "hassan@energyco.tz",
      brand: "EnergyCo",
      marketing_goals: "Boost brand awareness on campus and social media",
      budget: "1200000",
      message: "Looking for creative content and influencer partnerships.",
    },
  ];

  const inserts = [
    { table: "contact_leads", rows: contactLeads },
    { table: "event_leads", rows: eventLeads },
    { table: "marketing_leads", rows: marketingLeads },
  ];

  for (const { table, rows } of inserts) {
    const { error } = await supabase.from(table).insert(rows, { returning: "minimal" });
    if (error) throw error;
    console.log(`Inserted ${rows.length} rows into ${table}.`);
  }
}

async function main() {
  await ensureAvatarsBucket();
  await seedLeads();
  console.log("Database seed complete.");
}

main().catch((error) => {
  console.error("Seeding failed:", error.message || error);
  process.exit(1);
});
