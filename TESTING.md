Playwright smoke test
=====================

Run the Playwright smoke test locally (uses local mock Supabase):

1. Install dependencies

```bash
npm install
npx playwright install --with-deps
```

2. Start the dev server (in a separate terminal)

```bash
npm run dev
```

3. Run the test

```bash
npm run test:playwright
```

Notes:
- The tests set `TSMA_FORCE_MOCK=1` in `localStorage` so they run against the local mock Supabase client.
- If you change tests or Playwright config, re-run `npx playwright install` as needed.
