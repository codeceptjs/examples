Feature('codepress demo')

Before(async ({ I }) => {
  I.amOnPage('https://todomvc.com/examples/react/dist/')

  I.executeScript(() => console.log('Some info'))
  I.executeScript(() => console.error('Some error'))

  // Just to to some rest request
  I.sendPostRequest('https://reqres.in/api/users', {
    name: 'John Shaft',
    job: 'Investigator',
  })
  I.sendGetRequest('https://reqres.in/api/users?page=2')
  I.sendGetRequest('https://reqres.in/api/unknown/2')

  I.waitForVisible('.new-todo')
})

Scenario('Create some todo items @smoke', async ({ I }) => {
  I.say('When I focus the todo field')
  I.click('.new-todo')

  I.say('Then I can add additional todos')
  I.fillField({ css: '.new-todo'}, 'Optimize Puppeteer support')
  I.pressKey('Enter')

  I.fillField({ css: '.new-todo'}, 'Add a web REPL')
  I.pressKey('Enter')

  I.fillField(locate('.new-todo').as('TODO Input'), 'Support Appium')
  I.pressKey('Enter')

  I.fillField({ css: '.new-todo'}, 'Become REALLY productive writing E2E Tests with codepress and CodeceptJS')
  I.pressKey('Enter')

  I.say('And I see them in the list')
  I.seeNumberOfVisibleElements('.todo-list li', 4)
  I.see('Optimize Puppeteer support', { css: 'li:nth-child(1) label'})
  I.dontSee('Nightmare', '.main')

  I.saveScreenshot('create-multiple-todo-items.png')
})

// @full-browser: toggling a React checkbox requires native input events,
// which alternative no-render browsers don't dispatch
Scenario('Complete a todo @full-browser', async ({ I }) => {
  I.fillField({ css: '.new-todo'}, 'Complete me')
  I.pressKey('Enter')

  I.click({ css: 'li:nth-child(1) .toggle'})
  I.seeElement('li:nth-child(1).completed')
})
