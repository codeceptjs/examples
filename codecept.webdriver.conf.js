const { setHeadlessWhen } = require('@codeceptjs/configure');

setHeadlessWhen(process.env.HEADLESS);

exports.config = {
  tests: './todomvc-tests/**/*_test.js',
  output: './output',
  helpers: {
    WebDriver: {
      url: 'http://localhost',
      browser: 'chrome',
    },

    REST: {},

    CustomHelper: {
      require: './todomvc-tests/helpers/custom.helper.ts'
    }
  },

  gherkin: {
    features: './todomvc-tests/features/*.feature',
    steps: [
      './todomvc-tests/step-definitions/create-todos.steps.ts'
    ]
  },

  include: {
    TodosPage: './todomvc-tests/pages/todos.page.ts'
  },

  plugins: {
    wdio: {
      enabled: true,
      services: ['selenium-standalone']
    }
  },

  bootstrap: null,
  mocha: {},
  name: 'codecept demo tests'
}
