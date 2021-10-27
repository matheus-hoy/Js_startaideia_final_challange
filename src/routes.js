const express = require('express')
const router = express.Router();
const todoController = require('./controller/todo.controller')

//tarefas
router.get('/tarefas/:id', async(request, response) => {
    const todo = await todoController.findTodo(request, response)
    if (todo.error) return response.status(404).json(todo)
    return response.json(todo)
})

router.get('/tarefas', async(request, response) => {
    const todos = await todoController.listTodos(request, response)
    return response.json(todos)
})


router.post('/tarefas', async(request, response) => { 
    const todo = await todoController.createTodo(request, response)
    return response.json(todo)
})

router.put('/tarefas/:id', async(request, response) => {
    const todo = await todoController.updateTodo(request, response)
    if (todo.error) return response.status(404).json(todo)
    return response.json(todo)
})

router.delete('/tarefas/:id', async(request, response) => {
    const todo = await todoController.deleteTodo(request, response)
    if (todo.error) return response.json(todo)
    return response.json(todo)
})

module.exports = router
