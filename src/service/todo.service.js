const prisma = require('../prisma')

const listTodos = async () => { 
    const todos = await prisma.todo.findMany();
    return todos
}

const findTodo = async(id) => {
    const todo = await prisma.todo.findUnique({
        where: { id }
    })

    if(!todo) {
        return { error: "Todo não encontrado" }
    }

    return todo
}

const createTodo = async(todo) => {
    const { title, description } = todo
    const tododb = await prisma.todo.create({
        data:{
            title,
            description
        }
    }) 
    return tododb
}

const updateTodo = async(id, todo) => {
    const { title, description, complete } = todo
    const tododb = await findTodo(id)

    if(tododb.error) {
        return tododb.error
    }

    const todoUpdate = await prisma.todo.update({
        where:{ id },
        data: {
            title,
            description,
            complete
        }
    })

    return todoUpdate
}

const deleteTodo = async(id) => {
    const tododb = await findTodo(id)

    if(tododb.error) {
        return tododb.error
    }

    const todo = await prisma.todo.delete({
        where: { id }
    })

    return todo
}


module.exports = {
    listTodos,
    findTodo,
    createTodo,
    updateTodo,
    deleteTodo
}