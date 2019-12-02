exports.config = {
  tests: './todomvc-tests/**/*_test.js',
  output: './output',
  helpers: {
    TestCafe: {
      url: 'http://localhost',      
      browser: 'chrome',
      show: false,
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
  name: 'codepress demo tests'
}