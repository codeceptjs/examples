const { setHeadlessWhen } = require('@codeceptjs/configure');

setHeadlessWhen(process.env.HEADLESS);

// WebDriver (Selenium protocol) via a locally started chromedriver.
// The bootstrap script starts chromedriver on port 9515 and stops it after the run.

exports.config = {
  tests: './todomvc-tests/**/*_test.js',
  output: './output',
  helpers: {
    WebDriver: {
      url: 'https://todomvc.com',
      browser: 'chrome',
      host: '127.0.0.1',
      port: 9515,
      path: '/',
    },

    REST: {},

    CustomHelper: {
      require: './todomvc-tests/helpers/custom.helper.js'
    }
  },

  gherkin: {
    features: './todomvc-tests/features/*.feature',
    steps: [
      './todomvc-tests/step-definitions/create-todos.steps.js'
    ]
  },

  include: {
    TodosPage: './todomvc-tests/pages/todos.page.js'
  },
  bootstrap: require('./chromedriver-hooks').bootstrap,
  teardown: require('./chromedriver-hooks').teardown,
  mocha: {},
  name: 'codecept demo tests'
}
