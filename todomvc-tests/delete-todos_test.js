const { I, TodosPage } = inject();

Feature('@first Delete Todos @step:11 @smoke')

Before(async () => {
  TodosPage.goto()
});

/**
 * Happy Path tests
 */
Scenario('Delete a single todo item', async () => {
  I.say('Given I have one todo "foo"')
  TodosPage.enterTodo('foo')

  I.say('When I delete the first todo')
  TodosPage.deleteNthTodo(1)

  I.say('Then I have no todos left on my list')
  TodosPage.seeNumberOfTodos(0)
  I.saveScreenshot('delete-single-todo.png')
});

Scenario('Delete one of multiple todos keeps the others in order', async () => {
  I.say('Given I have todos "foo", "bar" and "baz"')
  TodosPage.enterTodo('foo')
  TodosPage.enterTodo('bar')
  TodosPage.enterTodo('baz')

  I.say('When I delete the second todo')
  TodosPage.deleteNthTodo(2)

  I.say('Then "bar" is gone and the order of the rest is kept')
  TodosPage.seeNumberOfTodos(2)
  TodosPage.seeNthTodoEquals(1, 'foo')
  TodosPage.seeNthTodoEquals(2, 'baz')
  I.saveScreenshot('delete-middle-todo.png')
});

/**
 * Edge cases
 */
Scenario('Delete todos one by one until the list is empty', async () => {
  I.say('Given I have todos "foo" and "bar"')
  TodosPage.enterTodo('foo')
  TodosPage.enterTodo('bar')

  I.say('When I delete the first todo twice')
  TodosPage.deleteNthTodo(1)
  TodosPage.deleteNthTodo(1)

  I.say('Then the todo list is empty and the footer count is gone')
  TodosPage.seeNumberOfTodos(0)
  I.dontSee('items left')
  I.saveScreenshot('delete-all-todos.png')
});
