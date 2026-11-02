const { I, TodosPage } = inject();

Given(/I have todos "([^"]*)" and "([^"]*)"/, (first, second) => {
  TodosPage.goto()
  TodosPage.enterTodo(first)
  TodosPage.enterTodo(second)
})

When(/I delete the (\w+) todo/, (position) => {
  const nth = { first: 1, second: 2, third: 3 }[position]
  TodosPage.deleteNthTodo(nth)
})

Then('I have no todos left on my list', () => {
  TodosPage.seeNumberOfTodos(0)
})
