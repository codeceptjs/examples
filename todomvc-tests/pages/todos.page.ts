const assert = require('assert')

const I = actor();

// const nthTodoCheckbox = nth => `.todo-list li:nth-child(${nth}) > div > input` // ({ xpath: `(//*[contains(@class,"todo-list")]/li/div/input)[${nth}]`})
// const nthTTodoDeleteButton = nth => `.todo-list li:nth-child(${nth}) > div > button` // ({ xpath: `(//*[contains(@class,"todo-list")]/li/div/button)[${nth}]`})
// const nthTodoEditField = nth => `.todo-list li:nth-child(${nth}) > form > input` // ({ xpath: `(//*[contains(@class,"todo-list")]/li/form/input)[${nth}]`})
// const nthTodoItem = nth => `.todo-list li:nth-child(${nth})` // ({ xpath: `(//*[contains(@class,"todo-list")]/li)[${nth}]`})

const nthTodoCheckbox = nth => locate('div > input').inside(`.todo-list li:nth-child(${nth})`)
const nthTTodoDeleteButton = nth => locate('div > button').inside(`.todo-list li:nth-child(${nth})`).as(`${nth}nth delete button`)
const nthTodoEditField = nth => locate('form > input').inside(`.todo-list li:nth-child(${nth})`).as(`${nth}nth todo input`)
const nthTodoItem = nth => locate('.todo-list li').at(nth).as(`${nth} todo item`)

module.exports = {
    goto() {
        I.amOnPage('https://todomvc.com/examples/react/dist/')
        I.refreshPage()
        I.executeScript(() => sessionStorage.clear())
        I.executeScript(() => console.error('Boom!'))
        I.waitForVisible('.new-todo')
    },

    enterTodo(todo) {
        I.fillField('.new-todo', todo)
        I.pressKey('Enter')
        I.wait(2);
    },

    enterTodos(todoItems) {
        I.executeScript((todoItems) => {
            localStorage.setItem('todos-angularjs', JSON.stringify(todoItems));
        }, todoItems)
    },

    async markNthAsCompleted(nthTodo) {
        const classNames = await I.grabAttributeFrom(nthTodoItem(nthTodo), 'class')
        assert(classNames.indexOf('completed') < 0, 'Expected todo to be not already marked as completed')
        I.click(nthTodoCheckbox(nthTodo))
    },

    async unmarkNthAsCompleted(nthTodo) {
        const classNames = await I.grabAttributeFrom(nthTodoItem(nthTodo), 'class')
        assert(classNames.indexOf('completed') >= 0, 'Expected todo to be marked as completed')
        I.click(nthTodoCheckbox(nthTodo))
    },

    markAllAsCompleted() {
        I.click('label[for="toggle-all"')
    },

    clearCompleted() {
        I.click('button.clear-completed')
    },

    filterAll() {
        I.click(locate('.filters li').at(1))
    },

    filterActive() {
        I.click(locate('.filters li').at(2))
    },

    filterCompleted() {
        I.click(locate('.filters li').at(3))
    },

    editNthTodo(nthTodo, newTodoText) {
        I.doubleClick(nthTodoItem(nthTodo))
        I.fillField(nthTodoEditField(nthTodo), newTodoText)
        I.pressKey('Enter')
    },

    deleteNthTodo(nthTodo) {
        // Use a custom helper function to hover over an todo item
        I.moveCursorTo(`.todo-list li:nth-child(${nthTodo})`)
        I.click(nthTTodoDeleteButton(nthTodo))
    },

    refresh() {
        I.refreshPage()
    },

    async seeNthTodoEquals(nthTodo, todo) {
        let todos: any = await I.grabTextFrom('.todo-list li')
        if (typeof todos === 'string') {
            todos = [todos]
        }

        assert(todos[nthTodo - 1] === todo, `Expected "${todo}" but got "${todos[nthTodo - 1]}"`)
        return todos
    },

    seeNumberOfTodos(numberOfTodos) {
        I.seeNumberOfVisibleElements('.todo-list li', numberOfTodos)
    },

    seeEmptyTodoInput() {
        I.seeInField('.new-todo', '')
    },

    seeFooter() {
        I.seeElement('footer.info')
    }
}

export function goto() {
    throw new Error("Function not implemented.");
}
export function enterTodo(arg0: string) {
    throw new Error("Function not implemented.");
}

export function seeNumberOfTodos(arg0: number) {
    throw new Error("Function not implemented.");
}

export function seeNthTodoEquals(arg0: number, arg1: any) {
    throw new Error("Function not implemented.");
}

export function seeEmptyTodoInput() {
    throw new Error("Function not implemented.");
}

export function seeFooter() {
    throw new Error("Function not implemented.");
}

export function editNthTodo(arg0: number, arg1: string) {
    throw new Error("Function not implemented.");
}

export function deleteNthTodo(arg0: number) {
    throw new Error("Function not implemented.");
}

export function clearCompleted() {
    throw new Error("Function not implemented.");
}

export function filterCompleted() {
    throw new Error("Function not implemented.");
}

export function markAllAsCompleted() {
    throw new Error("Function not implemented.");
}

export function filterActive() {
    throw new Error("Function not implemented.");
}

export function markNthAsCompleted(arg0: number) {
    throw new Error("Function not implemented.");
}

export function refresh() {
    throw new Error("Function not implemented.");
}

export function enterTodos(arg0: { title: string; completed: boolean; }[]) {
    throw new Error("Function not implemented.");
}

