// piechart.js
// This script reads cucumber-report.json and generates a pie chart as HTML.
const fs = require('fs');
const path = require('path');
const { ChartJSNodeCanvas } = require('chartjs-node-canvas');

const reportPath = path.join(__dirname, 'cucumberReports', 'cucumber-report.json');
const outputPath = path.join(__dirname, 'cucumberReports', 'piechart.html');

function getScenarioStats(report) {
  let passed = 0, failed = 0, skipped = 0;
  report.forEach(feature => {
    feature.elements.forEach(scenario => {
      const status = scenario.steps.some(step => step.result.status === 'failed') ? 'failed'
        : scenario.steps.every(step => step.result.status === 'passed') ? 'passed'
        : 'skipped';
      if (status === 'passed') passed++;
      else if (status === 'failed') failed++;
      else skipped++;
    });
  });
  return { passed, failed, skipped };
}

async function generatePieChart(stats) {
  const chartJSNodeCanvas = new ChartJSNodeCanvas({ width: 400, height: 400 });
  const config = {
    type: 'pie',
    data: {
      labels: ['Passed', 'Failed', 'Skipped'],
      datasets: [{
        data: [stats.passed, stats.failed, stats.skipped],
        backgroundColor: ['#4CAF50', '#F44336', '#FFC107'],
      }],
    },
    options: {
      plugins: {
        legend: { position: 'top' },
        title: { display: true, text: 'Cucumber Test Results' },
      },
    },
  };
  const image = await chartJSNodeCanvas.renderToDataURL(config);
  return `<html><body><h2>Cucumber Test Results Pie Chart</h2><img src="${image}" /></body></html>`;
}

async function main() {
  const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
  const stats = getScenarioStats(report);
  const html = await generatePieChart(stats);
  fs.writeFileSync(outputPath, html);
}

main();
