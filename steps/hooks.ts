import { Before, After } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world';

import dotenv from 'dotenv';
dotenv.config();

Before({ timeout: 30_000 }, async function () {
  await (this as CustomWorld).launch();
});

After({ timeout: 30_000 }, async function (scenario) {
  const rawName = scenario.pickle.name;
  const safeName = rawName.replace(/[^a-zA-Z0-9]/g, '');

  await (this as CustomWorld).saveScreenshot(safeName);
  await (this as CustomWorld).cleanup(safeName);
});