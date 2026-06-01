import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";
import type { Session, User } from "@supabase/supabase-js";

const isBrowser = typeof window !== "undefined";
const STORAGE_KEY = "tsma_mock_supabase_db";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const SUPABASE_PUBLISHABLE_KEY =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_PUBLISHABLE_KEY;
const SUPABASE_PROJECT_ID =
  import.meta.env.VITE_SUPABASE_PROJECT_ID || process.env.VITE_SUPABASE_PROJECT_ID;

export const isSupabaseMock = !SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY;

function isForceMock() {
  if (!isBrowser) return false;
  try {
    return window.localStorage.getItem("TSMA_FORCE_MOCK") === "1";
  } catch {
    return false;
  }
}

export function enableForceMock(enable = true) {
  if (!isBrowser) return;
  try {
    if (enable) window.localStorage.setItem("TSMA_FORCE_MOCK", "1");
    else window.localStorage.removeItem("TSMA_FORCE_MOCK");
  } catch {
    // ignore
  }
}

export function isSupabaseMockRuntime() {
  return isForceMock() || isSupabaseMock;
}

interface LocalUser {
  id: string;
  email: string;
  password: string;
  user_metadata: { full_name?: string };
  created_at: string;
}

interface LocalSession {
  access_token: string;
  refresh_token: string;
  expires_at: number;
  user: User;
}

interface LocalStorageRecord {
  users: LocalUser[];
  session: LocalSession | null;
  tables: Record<string, any[]>;
  uploads: Record<string, string>;
}

function getDefaultLocalDb(): LocalStorageRecord {
  return {
    users: [],
    session: null,
    tables: {
      contact_leads: [],
      event_leads: [],
      marketing_leads: [],
      profiles: [],
    },
    uploads: {},
  };
}

function readLocalDb() {
  if (!isBrowser) {
    return getDefaultLocalDb();
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as LocalStorageRecord) : getDefaultLocalDb();
  } catch {
    return getDefaultLocalDb();
  }
}

function writeLocalDb(db: LocalStorageRecord) {
  if (!isBrowser) return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
}

function generateId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return (crypto as Crypto).randomUUID();
  }
  return Math.random().toString(36).slice(2, 12);
}

function createAuthStateEmitter() {
  const listeners = new Set<(event: string, session: LocalSession | null) => void>();
  return {
    emit(event: string, session: LocalSession | null) {
      for (const listener of listeners) {
        listener(event, session);
      }
    },
    subscribe(callback: (event: string, session: LocalSession | null) => void) {
      listeners.add(callback);
      return () => listeners.delete(callback);
    },
  };
}

const authEmitter = createAuthStateEmitter();

function createMockSupabaseClient() {
  function currentDb() {
    return readLocalDb();
  }

  function saveDb(db: LocalStorageRecord) {
    writeLocalDb(db);
  }

  function findTable(table: string) {
    const db = currentDb();
    if (!db.tables[table]) {
      db.tables[table] = [];
    }
    return db.tables[table];
  }

  function createResponse(data: unknown, error: unknown = null) {
    return { data, error };
  }

  function createTable(table: string) {
    return {
      insert: async (payload: any, opts?: any) => {
        const db = currentDb();
        const rows = Array.isArray(payload) ? payload : [payload];
        const inserted = rows.map((row) => ({
          ...row,
          id: row.id ?? generateId(),
          created_at: row.created_at ?? new Date().toISOString(),
        }));
        const tableRows = findTable(table);
        tableRows.push(...inserted);
        saveDb(db);
        return createResponse(inserted, null);
      },
      upsert: async (payload: any, opts?: any) => {
        const db = currentDb();
        const tableRows = findTable(table);
        const row = { ...payload, id: payload.id ?? generateId() };
        const index = tableRows.findIndex((item) => item.id === row.id);
        if (index >= 0) {
          tableRows[index] = { ...tableRows[index], ...row };
        } else {
          tableRows.push(row);
        }
        saveDb(db);
        return createResponse(row, null);
      },
      select: (_fields: string) => {
        const tableRows = findTable(table);
        return {
          eq: (column: string, value: unknown) => ({
            maybeSingle: async () => {
              const found = tableRows.find((item) => item?.[column] === value) ?? null;
              return createResponse(found, null);
            },
          }),
        };
      },
    };
  }

  function createUserRecord(email: string, password: string, name?: string) {
    return {
      id: generateId(),
      email,
      password,
      user_metadata: { full_name: name },
      created_at: new Date().toISOString(),
    };
  }

  function createSession(user: LocalUser): LocalSession {
    return {
      access_token: generateId(),
      refresh_token: generateId(),
      expires_at: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
      user: {
        id: user.id,
        app_metadata: {},
        audience: "authenticated",
        created_at: user.created_at,
        email: user.email,
        email_confirmed_at: new Date().toISOString(),
        invited_at: null,
        last_sign_in_at: new Date().toISOString(),
        role: "authenticated",
        user_metadata: user.user_metadata,
      } as User,
    };
  }

  return {
    auth: {
      getSession: async () => {
        const db = currentDb();
        return createResponse({ session: db.session }, null);
      },
      onAuthStateChange: (handler: any) => {
        const callback = handler as (event: string, session: LocalSession | null) => void;
        const unsubscribe = authEmitter.subscribe(callback);
        return { data: { subscription: { unsubscribe } } };
      },
      signOut: async () => {
        const db = currentDb();
        db.session = null;
        saveDb(db);
        authEmitter.emit("SIGNED_OUT", null);
        return createResponse(null, null);
      },
      signInWithPassword: async ({ email, password }: { email: string; password: string }) => {
        const db = currentDb();
        const user = db.users.find((item) => item.email === email && item.password === password);
        if (!user) {
          return createResponse(null, { message: "Invalid email or password." });
        }
        const session = createSession(user);
        db.session = session;
        saveDb(db);
        authEmitter.emit("SIGNED_IN", session);
        return createResponse({ session }, null);
      },
      signUp: async ({ email, password, options }: { email: string; password: string; options?: any }) => {
        const db = currentDb();
        const existing = db.users.find((item) => item.email === email);
        if (existing) {
          return createResponse(null, { message: "User already exists." });
        }
        const user = createUserRecord(email, password, options?.data?.full_name);
        db.users.push(user);
        const session = createSession(user);
        // create a minimal profiles record so profile UI is enabled in mock mode
        if (!db.tables.profiles) db.tables.profiles = [];
        db.tables.profiles.push({ id: user.id, full_name: user.user_metadata?.full_name || null, email: user.email, created_at: user.created_at });
        db.session = session;
        saveDb(db);
        authEmitter.emit("SIGNED_IN", session);
        return createResponse({ user, session }, null);
      },
    },
    from: (table: string) => createTable(table),
    storage: {
      from: (bucket: string) => ({
        getPublicUrl: (path: string) => {
          if (bucket === "site-images") {
            return createResponse({ publicUrl: `/images/${path}` }, null);
          }
          if (bucket === "avatars") {
            const db = currentDb();
            const url = db.uploads[path] || "/images/avatar-placeholder.png";
            return createResponse({ publicUrl: url }, null);
          }
          return createResponse({ publicUrl: `/images/${path}` }, null);
        },
        upload: async (path: string, file: Blob, opts?: any) => {
          const db = currentDb();
          if (isBrowser && file) {
            try {
              const dataUrl = await new Promise<string>((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result as string);
                reader.onerror = () => reject(new Error("File read error"));
                reader.readAsDataURL(file as Blob);
              });
              db.uploads[path] = dataUrl;
              // If this looks like an avatars upload, update the profiles table to point to the uploaded URL
              try {
                const m = path.match(/^avatars\/([^\/]+)\//);
                if (m && m[1]) {
                  const userId = m[1];
                  if (!db.tables.profiles) db.tables.profiles = [];
                  const idx = db.tables.profiles.findIndex((p: any) => p.id === userId);
                  if (idx >= 0) {
                    db.tables.profiles[idx] = { ...db.tables.profiles[idx], avatar_url: dataUrl };
                  } else {
                    db.tables.profiles.push({ id: userId, avatar_url: dataUrl, created_at: new Date().toISOString() });
                  }
                }
              } catch (err) {
                // ignore
              }
              saveDb(db);
              return createResponse({ path }, null);
            } catch (err) {
              // fall through to placeholder
            }
          }
          const url = "/images/avatar-placeholder.png";
          db.uploads[path] = url;
          saveDb(db);
          return createResponse({ path }, null);
        },
      }),
    },
  };
}

function validateSupabaseConfig(url: string, projectId?: string) {
  if (!projectId) return;
  try {
    const host = new URL(url).hostname;
    const urlProjectId = host.split(".")[0];
    if (urlProjectId !== projectId) {
      throw new Error(
        `Supabase config mismatch: SUPABASE_URL host '${urlProjectId}' does not match VITE_SUPABASE_PROJECT_ID '${projectId}'. ` +
          "Update both values so the app and Supabase project reference the same project ref."
      );
    }
  } catch (error) {
    if (error instanceof Error && error.message.startsWith("Invalid URL")) {
      throw new Error(`Supabase config error: SUPABASE_URL '${url}' is not a valid URL.`);
    }
    throw error;
  }
}

function createSupabaseClient() {
  if (isForceMock() || !SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
    if (isBrowser) {
      console.warn("Using local mock Supabase backend (forced or no env vars detected).");
    }
    return createMockSupabaseClient();
  }

  validateSupabaseConfig(SUPABASE_URL, SUPABASE_PROJECT_ID);

  return createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
    auth: {
      storage: typeof window !== "undefined" ? localStorage : undefined,
      persistSession: true,
      autoRefreshToken: true,
    },
  });
}

let _supabase: ReturnType<typeof createSupabaseClient> | undefined;

export const supabase = new Proxy({} as ReturnType<typeof createSupabaseClient>, {
  get(_, prop, receiver) {
    if (!_supabase) _supabase = createSupabaseClient();
    return Reflect.get(_supabase, prop, receiver);
  },
});
