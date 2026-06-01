import { test, expect } from '@playwright/test';

function base64TinyPng() {
  // 1x1 transparent PNG
  return (
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAEElEQVQImWNgYGAAAAAEAAGjCh0AAAAASUVORK5CYII='
  );
}

test('register and upload avatar in mock mode', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => localStorage.setItem('TSMA_FORCE_MOCK', '1'));

  await page.goto('/register');

  await page.fill('input[name="name"]', 'Playwright Test');
  const email = `pw+${Date.now()}@example.com`;
  await page.fill('input[name="email"]', email);
  await page.fill('input[name="password"]', 'password123');

  await Promise.all([
    page.click('button:has-text("Register")'),
    page.waitForNavigation({ waitUntil: 'networkidle' }).catch(() => {}),
  ]);

  await page.goto('/profile');
  await expect(page.locator('input[type=file]')).toBeVisible();

  const png = base64TinyPng();
  const buffer = Buffer.from(png, 'base64');

  await page.setInputFiles('input[type=file]', {
    name: 'avatar.png',
    mimeType: 'image/png',
    buffer,
  });

  await page.click('button:has-text("Upload avatar")');

  // give the app a moment to perform uploads and localStorage writes
  await page.waitForTimeout(2000);

  const dbRaw = await page.evaluate(() => localStorage.getItem('tsma_mock_supabase_db'));
  console.log('mock db:', dbRaw);
  expect(dbRaw).toBeTruthy();
  const db = JSON.parse(dbRaw || '{}');

  expect(db.uploads && Object.keys(db.uploads).length).toBeGreaterThan(0);

  const profiles = db.tables && db.tables.profiles ? db.tables.profiles : [];
  const me = profiles.find((p: any) => p.email === email || p.id === (db.session && db.session.user && db.session.user.id));
  expect(me).toBeTruthy();
  expect(me.avatar_url || me.avatarUrl).toBeTruthy();
});
