# TSMA

This project is a Tanstack React + Supabase starter app for a student marketing agency.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Use Node.js 20.19.0 or newer.

3. Copy environment file:

```bash
cp .env.example .env
```

3. Fill in your Supabase project values if you have them:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`
- `VITE_SUPABASE_PROJECT_ID`
- `SUPABASE_SERVICE_ROLE_KEY` (optional for seeding data)
- `SUPABASE_DB_PASSWORD` (required for `npm run migrate` when using remote database)

If you do not have a Supabase account or credentials, the app will still run locally using a built-in mock backend.

4. Run migrations:

```bash
npm run migrate
```

5. Seed demo database data:

```bash
npm run seed
```

6. Or run the full setup pipeline:

```bash
npm run setup
```

7. Start the dev server:

```bash
npm run dev
```

## Testing

A Playwright smoke test exists for the mock registration/login/avatar upload flow.

```bash
npx playwright install --with-deps
npm run test:playwright
```

## Deploying online

This repository is already configured for Cloudflare Workers deployment.

1. Create a GitHub repository and add it as a remote for this branch.
2. Add the following GitHub secrets to the repository:
   - `CF_API_TOKEN`
   - `CF_ACCOUNT_ID`
3. Push to `main` or merge this branch into `main`.

A GitHub Actions workflow will automatically deploy the app on pushes to `main`.

For local deploys after logging in or setting up a local Cloudflare token, run:

```bash
npm run deploy:cloudflare
```

If you need to publish this branch after configuring a Git remote, run:

```powershell
.\/scripts/publish-github.ps1 -RemoteUrl '<git-remote-url>'
```

## Supabase notes

- The app uses Supabase Auth for registration and login.
- `profiles` are stored in `public.profiles`.
- `contact_leads`, `event_leads`, and `marketing_leads` hold form submissions.
- An `avatars` storage bucket is used for profile image uploads.

## Scripts

- `npm run dev` - start Vite dev server
- `npm run build` - build for production
- `npm run migrate` - apply Supabase migrations via Supabase CLI
- `npm run seed` - seed demo data using Supabase service role key
- `npm run lint` - run ESLint
- `npm run format` - format with Prettier
- `npm run test:playwright` - run Playwright smoke tests

## Important

Install the Supabase CLI before running `npm run migrate`.

```bash
npm install -g supabase
```

If you prefer not to use the CLI, you can run SQL migration files manually from the Supabase dashboard.
