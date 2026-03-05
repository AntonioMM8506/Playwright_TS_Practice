import { Before, After, AfterStep } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world';



Before({ timeout: 30_000 }, async function () {
  this.stepResults = [];
  await (this as CustomWorld).launch();
});

AfterStep(function (this: CustomWorld, step) {

  const status = step.result?.status ?? 'unknown';
  const stepText = step.pickleStep.text;

  let formatted = `(${status.toLowerCase()}) ${stepText}`;

  if (status === 'FAILED') {
    
    const errorMessage = step.result?.message || 'Unknown error';
    formatted += `
      ERROR:
      ${errorMessage}
      `;
  }
  this.stepResults.push(formatted);

});

After({ timeout: 30_000 }, async function (scenario) {
  const rawName = scenario.pickle.name;
  const safeName = rawName.replace(/[^a-zA-Z0-9]/g, '');

  await (this as CustomWorld).saveScreenshot(safeName);
  await (this as CustomWorld).saveStepLog(safeName);
  await (this as CustomWorld).cleanup(safeName);
});