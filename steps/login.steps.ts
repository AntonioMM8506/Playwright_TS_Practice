import { Given, When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world';
import { LoginPage } from '../pages/LoginPage';
import { expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';


Given('User is in the Login Page', async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page);
  await loginPage.goToAsync();
});

When('{string} user enters their valid credentials',{ timeout: 30000 },
  async function (this: CustomWorld, userType: string) {
    const loginPage = new LoginPage(this.page);
    await loginPage.loginAsync(userType);
  }
);

Then('user can see the Home Page', async function (this: CustomWorld) {
  const homePage = new HomePage(this.page);
  await expect(homePage.appLogo).toBeVisible;
});


When('standard user enters {string} as password', async function (this: CustomWorld, password: string) {
  const loginPage = new LoginPage(this.page);
  const username = process.env.STANDARD_USER || '';
  await loginPage.loginWithPassword(username, password);
});


Then('user sees error message {string}', async function (this: CustomWorld, errorMessage: string) {
  const loginPage = new LoginPage(this.page);
  await expect(loginPage.errorMessage).toBeVisible();
  await expect(loginPage.errorMessage).toHaveText(errorMessage);
});
