import { execSync } from "child_process";
import fs from "fs";
import path from "path";

const envFile = path.resolve(process.cwd(), ".env");
const env = fs.existsSync(envFile)
  ? Object.fromEntries(
      fs
        .readFileSync(envFile, "utf8")
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter((line) => line && !line.startsWith("#"))
        .map((line) => {
          const idx = line.indexOf("=");
          const key = line.slice(0, idx).trim();
          const value = line.slice(idx + 1).trim().replace(/^"|"$/g, "");
          return [key, value];
        }),
    )
  : {};

Object.assign(process.env, env);
const projectId = process.env.VITE_SUPABASE_PROJECT_ID;
const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;

function runCommand(command) {
  console.log(`> ${command}`);
  execSync(command, { stdio: "inherit", env: process.env });
}

const SUPABASE_COMMAND = "npx supabase";

try {
  execSync(`${SUPABASE_COMMAND} --version`, { stdio: "ignore" });
} catch (error) {
  console.error("Supabase CLI is not installed and could not be run via npx.");
  console.error("Install it from https://supabase.com/docs/guides/cli or ensure npx is available.");
  process.exit(1);
}

if (!projectId && !supabaseUrl) {
  console.error("Missing Supabase project configuration. Set VITE_SUPABASE_PROJECT_ID or SUPABASE_URL in your environment or .env file.");
  process.exit(1);
}

try {
  if (projectId) {
    try {
      runCommand(`${SUPABASE_COMMAND} link --project-ref ${projectId}`);
    } catch (error) {
      console.warn("Could not link Supabase project automatically. Falling back to direct db push.");
      console.warn(error.message || error);
    }
  }

  const dbPushCommand = `${SUPABASE_COMMAND} db push`;
  runCommand(dbPushCommand);
  console.log("Supabase migrations applied successfully.");
} catch (error) {
  console.error("Migration helper failed:", error.message || error);
  process.exit(1);
}
