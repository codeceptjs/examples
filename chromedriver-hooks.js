// Starts a local chromedriver instance for the WebDriver helper (bootstrap)
// and stops it when the test run finishes (teardown).
const { spawn } = require('child_process')
const http = require('http')
const chromedriver = require('chromedriver')

let chromedriverProcess = null

function waitForStatus(url, retries = 30) {
  return new Promise((resolve, reject) => {
    const attempt = remaining => {
      const req = http.get(url, res => {
        res.resume()
        if (res.statusCode === 200) return resolve()
        retry(remaining)
      })
      req.on('error', () => retry(remaining))
    }
    const retry = remaining => {
      if (remaining <= 0) return reject(new Error('chromedriver did not start'))
      setTimeout(() => attempt(remaining - 1), 500)
    }
    attempt(retries)
  })
}

exports.bootstrap = async function () {
  chromedriverProcess = spawn(chromedriver.path, ['--port=9515'], { stdio: 'ignore' })
  await waitForStatus('http://127.0.0.1:9515/status')
}

exports.teardown = async function () {
  if (chromedriverProcess) chromedriverProcess.kill()
}
