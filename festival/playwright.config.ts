import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  // Disable webServer in CI runner lacking networking tools; rely on baseURL served externally
  // You can enable this locally if needed
  // webServer: {
  //   command: 'npm run dev',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  //   stdout: 'pipe',
  //   stderr: 'pipe',
  //   timeout: 120000,
  // },
  use: { baseURL: 'http://localhost:3000' },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
});
