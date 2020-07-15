This repo contains tests for TodoMVC application.
Tests can be executed via different helpers.

![](todo.png)

# Installation

This is a playground for your first steps in testing, so instead of installing it from NPM it is recommended to clone it from repo instead and then install the dependencies:

```
git clone codeceptjs-examples && cd codeceptjs-examples && npm i
```

This will install codeceptjs with puppeteer, webdriverio & testcafe packages. 

# Running Tests

The default helper is Playwright.

## Playwright

Use `codecept.conf.js` to run tests with Playwright:

```
npx codeceptjs run --steps
```

## Puppeteer

Use `codecept.puppeteer.conf.js` to run tests with Puppeteer:

```
npx codeceptjs run --steps -c codecept.puppeteer.conf.js 
```


## WebDriver

Use `codecept.webdriver.conf.js` to run tests with WebDriver in Chrome:

```
npx codeceptjs run -c codecept.webdriver.conf.js --steps 
```

## TestCafe

Use `codecept.testcafe.conf.js` to run tests with TestCafe in Chrome:

```
npx codeceptjs run -c codecept.testcafe.conf.js --steps 
```

## Headless Mpde

Run tests in headless mode:

```
HEADLESS=true npx codeceptjs run --steps
```

## Parallel Execution

Run tests in parallel with 3 workers:

```
npx codeceptjs run-workers 3
```

## Credits

Created as part of codepress by Stefan Huber.
Maintained by CodeceptJS Team.

## LICENSE

MIT
