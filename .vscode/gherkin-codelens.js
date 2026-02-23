const vscode = require("vscode");

function activate(context) {
  const provider = {
    provideCodeLenses(document) {
      if (!document.fileName.endsWith(".feature")) return [];

      const codeLenses = [];
      const lines = document.getText().split("\n");

      lines.forEach((line, i) => {
        const scenarioMatch = line.match(/^\s*Scenario:\s*(.+)/i);
        if (scenarioMatch) {
          const name = scenarioMatch[1].trim();

          const range = new vscode.Range(i, 0, i, line.length);

          // ▶ Run
          codeLenses.push(
            new vscode.CodeLens(range, {
              title: "▶ Run Scenario",
              command: "gherkinRunner.runScenario",
              arguments: [name]
            })
          );

          // 🐞 Debug
          codeLenses.push(
            new vscode.CodeLens(range, {
              title: "🐞 Debug Scenario",
              command: "gherkinRunner.debugScenario",
              arguments: [name]
            })
          );
        }
      });

      return codeLenses;
    },
  };

  // Registrar el proveedor
  context.subscriptions.push(
    vscode.languages.registerCodeLensProvider({ language: "feature" }, provider)
  );

  // Comando: Run
  context.subscriptions.push(
    vscode.commands.registerCommand("gherkinRunner.runScenario", (scenarioName) => {
      const terminal = vscode.window.createTerminal("Cucumber Runner");
      terminal.show();
      terminal.sendText(`npx cucumber-js --config cucumber.config.js --name "${scenarioName}"`);
    })
  );

  // Comando: Debug
  context.subscriptions.push(
    vscode.commands.registerCommand("gherkinRunner.debugScenario", (scenarioName) => {
      const terminal = vscode.window.createTerminal("Cucumber Debug");
      terminal.show();
      terminal.sendText(
        `node --inspect-brk ./node_modules/@cucumber/cucumber/bin/cucumber-js --config cucumber.config.js --name "${scenarioName}"`
      );
    })
  );
}

module.exports = { activate };