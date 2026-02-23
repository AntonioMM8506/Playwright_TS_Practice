module.exports = {
  default: {
    paths: ['./features/**/*.feature'],
    require: [
      './support/world.ts',
      './steps/**/*.ts',
      './steps/hooks.ts'
    ],
    requireModule: ['ts-node/register'],
    publishQuiet: true,
    format: ['progress', 'html:cucumber-report.html'],
    parallel: 2,
    timeout: 30000
  }
};