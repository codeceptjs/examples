const { setHeadlessWhen } = require('@codeceptjs/configure');

setHeadlessWhen(process.env.HEADLESS);

// Obscura (https://github.com/h4ckf0r0day/obscura) — a lightweight open-source browser
// exposed over CDP. Renders real screenshots, much smaller footprint than Chrome.
//
// Requirements: `obscura` binary from https://github.com/h4ckf0r0day/obscura/releases
// on your PATH, or pointed to by OBSCURA_PATH / binaryPath below.
// The helper starts `obscura` per run and stops it automatically.

exports.config = {
  tests: './todomvc-tests/**/*_test.js',
  // exclude tests that need a full browser (hover, real pointer input)
  grep: '^(?!.*@full-browser).*',
  output: './output',
  helpers: {
    Obscura: {
      url: 'https://todomvc.com',
      // binaryPath: 'C:/tools/obscura/obscura.exe', // or set OBSCURA_PATH env variable
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
  plugins: {},
  name: 'codecept demo tests (Obscura)'
}
