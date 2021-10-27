const { todo } = require('../prisma')
const todoService = require('../service/todo.service')

const listTodos = async () => {
    const todos = await todoService.listTodos()
    return todos
}

const findTodo = async(request, response) => {
    const { id } = request.params
    const todo = await todoService.findTodo(+id)
    return todo
}

const createTodo = async(request, response) => {
    const { title, description } = request.body
    const todo = await todoService.createTodo({
        title, 
        description,
    })
    return todo
}

const updateTodo = async(request, response) => {
    const { id } = request.params
    const { title, description, complete } = request.body
    const todo = await todoService.updateTodo(+id, { title, description, complete })
    return todo
}

const deleteTodo = async(request, response) => {
    const { id } = request.params
    const todo = await todoService.deleteTodo(+id)
    return todo
}



module.exports = {
    listTodos,
    findTodo,
    createTodo,
    updateTodo,
    deleteTodo
}