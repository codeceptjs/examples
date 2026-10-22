const { setHeadlessWhen } = require('@codeceptjs/configure');

setHeadlessWhen(process.env.HEADLESS);

// Lightpanda (https://lightpanda.io) — a headless browser built from scratch for automation.
// Runs real JavaScript in V8 but never paints a page: no screenshots, no coordinate clicks.
// Perfect for fast smoke tests; keep a Playwright job for rendering-sensitive checks.
//
// Requirements: `lightpanda` binary from https://lightpanda.io/docs/open-source/installation
// on your PATH, or pointed to by LIGHTPANDA_PATH / binaryPath below.
// The helper starts `lightpanda serve` per run and stops it automatically.

exports.config = {
  tests: './todomvc-tests/**/*_test.js',
  // exclude tests that need a full browser (hover, real pointer input)
  grep: '^(?!.*@full-browser).*',
  output: './output',
  helpers: {
    Lightpanda: {
      url: 'https://todomvc.com',
      // binaryPath: 'C:/tools/lightpanda', // or set LIGHTPANDA_PATH env variable
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
  name: 'codecept demo tests (Lightpanda)'
}
