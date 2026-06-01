import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: 'tests/playwright',
  timeout: 60_000,
  use: {
    baseURL: 'http://localhost:8080',
    headless: true,
    trace: 'off',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
