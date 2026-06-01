Supabase setup for TSMA

This document describes the minimal steps to prepare Supabase resources and run the project locally.

1) Prerequisites
- Install the Supabase CLI (optional but recommended) and be logged in: `supabase login`
- Ensure you have access to your Supabase project from the dashboard

2) Apply database migrations
- The SQL migrations are in `supabase/migrations/`.
- Using the Supabase Dashboard SQL editor: open the file `20260520120000_create_profiles_table.sql` and run it.
- Or, using the Supabase CLI, link your project and run migrations:

  supabase login
  supabase link --project-ref <your-project-ref>
  # Apply migrations (check your CLI version/docs) — alternatively run the SQL manually.

3) Create storage bucket for avatars
- Open Supabase dashboard → Storage → Create a new bucket named `avatars`.
- If you want public avatars, set the bucket to public access; otherwise configure signed URLs and adjust app logic.

4) Confirm RLS and policies
- The migration `20260520120000_create_profiles_table.sql` enables RLS for `profiles` and adds policies so authenticated users can manage their own records.
- Review the `profiles` table and policies in the Dashboard → SQL editor to confirm they were applied.

5) Environment variables
- Copy your Supabase project URL and anonymous/public key into a `.env` file or to your environment as Vite variables:

  VITE_SUPABASE_URL=https://xxxx.supabase.co
  VITE_SUPABASE_PUBLISHABLE_KEY=public-anon-key

- For server-side operations (if needed) you can reference the Supabase service role key via secure server environment variables — DO NOT commit the service role key to source control.

6) Run the app locally
- Install dependencies and run the dev server:

```bash
npm install
npm run dev
```

- Build for production:

```bash
npm run build
```

7) Optional: Auto-create profiles on signup
- The migrations include a trigger `handle_new_user()` that creates a minimal `profiles` record when a new `auth.users` row is inserted. If you prefer to manage this in functions/triggers on the server, review `supabase/migrations/20260520120000_create_profiles_table.sql`.

8) Notes about avatar uploads
- The app expects a storage bucket named `avatars`. Uploaded files are saved at `avatars/{userId}/{timestamp}_{filename}` and the `profiles.avatar_url` column stores the public URL returned by Supabase storage.
- If your bucket is private, modify the client logic to request signed URLs from your server.

If you want, I can add a helper script to create the storage bucket via the Supabase CLI, or generate a Postgres migration runner for CI. Let me know which you prefer.
