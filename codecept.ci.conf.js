const { setHeadlessWhen } = require('@codeceptjs/configure');

setHeadlessWhen(true);

exports.config = {
  tests: './Temp.js',
  output: './output',
  helpers: {
    Playwright: {
      url: 'https://web.bachelorapp.net/participation',
      waitForTimeout: 5000,
      show: true,
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
  bootstrap: null,
  mocha: {},
  name: 'codecept demo tests'
}
