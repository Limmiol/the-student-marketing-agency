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

function runCommand(command) {
  console.log(`> ${command}`);
  execSync(command, { stdio: "inherit", env: process.env });
}

function requireEnv(name) {
  if (!process.env[name]) {
    console.warn(`Warning: ${name} is not set.`);
  }
}

requireEnv("VITE_SUPABASE_URL");
requireEnv("VITE_SUPABASE_PUBLISHABLE_KEY");
requireEnv("VITE_SUPABASE_PROJECT_ID");
requireEnv("SUPABASE_DB_PASSWORD");
requireEnv("SUPABASE_SERVICE_ROLE_KEY");

try {
  runCommand("npm run migrate");
  runCommand("npm run seed");
  console.log("Project setup complete.");
} catch (error) {
  console.error("Setup failed:", error.message || error);
  process.exit(1);
}