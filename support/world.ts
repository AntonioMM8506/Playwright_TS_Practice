import { setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page, chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

import dotenv from 'dotenv';
dotenv.config();

export class CustomWorld extends World {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;

  stepResults: string[] = [];
  timestamp: string;

  constructor(options: IWorldOptions) {
    super(options);

    this.timestamp = new Date()
      .toISOString()
      .replace(/[-:]/g, '')
      .replace('T', '-')
      .replace(/\..+/, '');
  }


  async launch() {
    this.browser = await chromium.launch({ headless: process.env.HEADLESS === 'true' });
    this.context = await this.browser.newContext();

    await this.context.tracing.start({
      screenshots: true,
      snapshots: true,
      sources: true
    });

    this.page = await this.context.newPage();
    this.page.setDefaultTimeout(60000);
  }

  async saveScreenshot(scenarioName: string) {
    if (!this.page) return;

    const fileName = `${scenarioName}-${this.timestamp}.png`;
    const dir = path.join(process.cwd(), 'test-results');

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const fullPath = path.join(dir, fileName);
    await this.page.screenshot({ path: fullPath, fullPage: true });

    console.log(`ScreenShot saved: ${fullPath}`);
  }

  async saveStepLog(scenarioName: string) {
    const dir = path.join(process.cwd(), 'test-results');

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const filePath = path.join(
      dir,
      `${scenarioName}-${this.timestamp}.txt`
    );

    const content = this.stepResults.join('\n');

    fs.writeFileSync(filePath, content);

    console.log(`Step log saved: ${filePath}`);
  }

  
  async cleanup(scenarioName: string) {
  if (this.context) {
    try {
      await this.context.tracing.stop({
        path: `./test-results/${scenarioName}-${this.timestamp}.zip`
      });
    } catch (err) {
      console.warn('Tracing stop failed:', err);
    }
  }

  await this.page?.close();
  await this.context?.close();
  await this.browser?.close();
}
}

setWorldConstructor(CustomWorld);