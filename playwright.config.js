// @ts-check
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({

  testDir: './tests',

  fullyParallel: true,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 1 : undefined,

 reporter: [
  ['allure-playwright']
],

  use: {

    headless: false,

    screenshot: 'on',

    trace: 'on-first-retry',

    baseURL: 'https://www.demoblaze.com',

  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

});