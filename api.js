const http = require('http')
const fs = require('fs')

const port = 5050
const host = '127.0.0.1'

const Todo = require('./api.service')
const todo = new Todo()

if (!fs.existsSync('./api.json')) {
  fs.writeFileSync('./api.json', '[]', 'utf-8')
}

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')

  if (req.method === "GET") {
    todo.getTodo(req, res)
  } else if (req.method === "POST") {
    todo.createTodo(req, res)
  } else if (req.method === "PUT") {
    todo.updateTodo(req, res)
  } else if (req.method === "DELETE") {
    todo.deleteTodo(req, res)
  }
})

server.listen(port, host, () => {
  console.info(`Server started at http://${host}:${port}/`)
})