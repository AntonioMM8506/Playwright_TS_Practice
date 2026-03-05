import { test, expect } from '@playwright/test';

test("title", async ({page}) =>{
    await page.goto("https://www.google.com");
});