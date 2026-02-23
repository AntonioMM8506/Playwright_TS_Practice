import { setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page, chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

export class CustomWorld extends World {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;

  constructor(options: IWorldOptions) {
    super(options);
  }

  async launch() {
    this.browser = await chromium.launch({ headless: false });
    //args: ['--auto-open-devtools-for-tabs'] 
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

    const timestamp = new Date()
      .toISOString()
      .replace(/[-:]/g, '')
      .replace('T', '-')
      .replace(/\..+/, '');

    const fileName = `${scenarioName}-${timestamp}.png`;
    const dir = path.join(process.cwd(), 'test-results');

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const fullPath = path.join(dir, fileName);
    await this.page.screenshot({ path: fullPath, fullPage: true });

    console.log(`ScreenShot saved: ${fullPath}`);
  }

  async cleanup(scenarioName: string) {
  if (this.context) {
    try {
      const timestamp = new Date()
        .toISOString()
        .replace(/[-:]/g, '')
        .replace('T', '-')
        .replace(/\..+/, '');

      await this.context.tracing.stop({
        path: `./test-results/${scenarioName}-${timestamp}.zip`
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