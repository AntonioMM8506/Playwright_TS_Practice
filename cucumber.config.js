module.exports = {
  default: {
    paths: ['./features/**/*.feature'],
    require: [
      './support/world.ts',
      './steps/**/*.ts',
      './steps/hooks.ts'
    ],
    requireModule: ['ts-node/register', 'source-map-support/register'],
    publishQuiet: true,
    format: [
      'progress-bar', //To see a progress bar during test execution 
      'summary', //To see a summary of the test run
      //'usage', //To see the elapsed time for each step
      //'@cucumber/pretty-formatter', // To have a more readable console output
      'rerun:cucumberReports/@rerun.txt', // To capture failed scenarios for re-running
      'html:cucumberReports/cucumber-report.html', // To generate an HTML report
      'json:cucumberReports/cucumber-report.json' // To generate a JSON report for further analysis or integration with CI tools
    ],
    formatOptions: {
      printStacktrace: true,
      snippetInterface: 'async-await'
    },
    backtrace: true,
    parallel: 4,
    timeout: 5000 // Deafult Timeout for steps is 5 seconds, you can adjust it as needed
  }
};