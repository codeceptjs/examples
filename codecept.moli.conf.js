const { setHeadlessWhen } = require('@codeceptjs/configure');

setHeadlessWhen(process.env.HEADLESS);

// Moli (https://github.com/lexmount/moli) — an open-source headless browser written in Rust.
// Runs real JavaScript and computes real CSS, but skips layout and painting:
// no screenshots, no coordinate-based clicks. Very fast startup, tiny footprint.
//
// Requirements:
//   - `moli` binary from https://github.com/lexmount/moli#direct-installation on your PATH,
//     or pointed to by MOLI_PATH / binaryPath below
//   - CodeceptJS with the Moli helper (added after 4.2.1; use codeceptjs from the 4.x branch
//     until the next release: npm i codeceptjs@codeceptjs/CodeceptJS#4.x)
//
// The helper starts `moli serve` per run and stops it automatically.

exports.config = {
  tests: './todomvc-tests/**/*_test.js',
  // exclude tests that need a full browser (hover, real pointer input)
  grep: '^(?!.*@full-browser).*',
  output: './output',
  helpers: {
    Moli: {
      url: 'https://todomvc.com',
      // binaryPath: 'C:/tools/moli/moli.exe', // or set MOLI_PATH env variable
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
  name: 'codecept demo tests (Moli)'
}
