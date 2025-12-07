import { defineConfig, devices } from '@playwright/test';

/**
 * EXPERT SYSTEM - End-to-End Test Configuration
 * 
 * This configuration runs comprehensive tests for all critical flows
 */
export default defineConfig({
  testDir: './expert',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 1 : undefined,
  timeout: 60000, // 60 seconds per test
  expect: {
    timeout: 10000, // 10 seconds for assertions
  },
  globalSetup: require.resolve('./expert/global-setup.ts'),
  globalTeardown: require.resolve('./expert/global-teardown.ts'),
  reporter: [
    ['list'],
    ['html', { outputFolder: 'expert-report' }],
    ['json', { outputFile: 'expert-report/results.json' }],
  ],
  use: {
    baseURL: process.env.EXPERT_URL || 'http://localhost:3000',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 15000, // 15 seconds for actions
    navigationTimeout: 30000, // 30 seconds for navigation
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // Uncomment for cross-browser testing
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],

  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});

