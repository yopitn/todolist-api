const fs = require('fs')

class Todo {
  renderApi() {
    const todoBuffer = fs.readFileSync('./api.json')
    const todos = JSON.parse(todoBuffer)

    return JSON.stringify(
      todos.map((value) => {
        return {
          id: value.id,
          title: value.title,
          completed: value.completed
        }
      })
    )
  }

  getTodo(req, res) {
    res.write(this.renderApi())
    res.end()
  }

  createTodo(req, res) {
    req.on('data', data => {
      const body = JSON.parse(data.toString())

      const todo = {id: Date.now(), title: body.title, completed: body.completed}

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
          if (body.title !== undefined) {
            element.title = body.title
          }

          if (body.completed !== undefined) {
            element.completed = body.completed
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