const fs = require('fs')
const { builtinModules } = require('module')

class Todo {
  renderApi() {
    const todoBuffer = fs.readFileSync('./api.json')
    const todos = JSON.parse(todoBuffer)

    return JSON.stringify({
      code: 200,
      status: "OK",
      data: todos.map((value) => {
        return {
          id: value.id,
          todo: value.todo,
          status: value.status
        }
      })
    })
  }

  getTodo(req, res) {
    res.write(this.renderApi())
    res.end()
  }

  createTodo(req, res) {
    req.on('data', data => {
      const body = JSON.parse(data.toString())

      const todo = {id: Date.now(), todo: body.todo, status: body.status}

      const todoBuffer = fs.readFileSync('./api.json')
      const todos = JSON.parse(todoBuffer)

      todos.push(todo)

      fs.writeFileSync('./api.json', JSON.stringify(todos))

      res.write(this.renderApi())
      res.end()
    })
  }

  updateTodo(req, res) {
    req.on('data', data => {
      const body = JSON.parse(data.toString())

      const todoBuffer = fs.readFileSync('./api.json')
      const todos = JSON.parse(todoBuffer)

      todos.forEach(element => {
        if (element.id === body.id) {
          if (body.todo !== undefined) {
            element.todo = body.todo
          }

          if (body.status !== undefined) {
            element.status = body.status
          }
        }
      });

      fs.writeFileSync('./api.json', JSON.stringify(todos))

      res.write(this.renderApi())
      res.end()
    })
  }

  deleteTodo(req, res) {
    req.on('data', data => {
      const body = JSON.parse(data.toString())

      const todoBuffer = fs.readFileSync('./api.json')
      const todos = JSON.parse(todoBuffer)

      let arrTodos = []

      todos.forEach(element => {
        arrTodos.push(element.id)
      });

      const todosIndex = arrTodos.indexOf(body.id)

      todos.splice(todosIndex, 1)

      fs.writeFileSync('./api.json', JSON.stringify(todos))

      res.write(this.renderApi())
      res.end()
    })
  }
}

module.exports = Todo