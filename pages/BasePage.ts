import { Page } from 'playwright';

export class BasePage {
  constructor(protected page: Page) {}

  async navigate(path: string) {
    await this.page.goto(path);
  }

  async goToAsync() {
    const baseUrl = process.env.BASE_URL;
    if (!baseUrl) {
      throw new Error("There's no Base Url defined");
    }

    await this.navigate(baseUrl); // Ajusta el path si es diferente
  }
}