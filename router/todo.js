const express = require("express")
const router = express.Router()
const todoArr = [
    {
        id: 1,
        task: "Create api",
        tags: ["nodejs", "javasript"],
        status: "todo"
    },
    {
        id: 2,
        task: "Create api",
        tags: ["nodejs"],
        status: "pending"
    },
    {
        id: 3,
        task: "Create api",
        tags: ["nodejs"],
        status: "done"
    },
]

router.get('/', (req, res) => {
    res.send('task is created');
});
router.get('/todos', (req, res) => {
    res.send(todoArr);
});
router.get('/todos/:id', (req, res) => {

    const todoId = parseInt(req.params.id);
    const todo = todoArr.find((t) => t.id = todoId)
    res.send(todo)
});


router.post('/todos', (req, res) => {
    const todo = req.body;
    const newTodo = {
        id: todoArr[todoArr.length - 1].id + 1,
        task: todo.task,
        tags: todo.tags,
        status: todo.status

    }

    todoArr.push(newTodo);
    console.log(newTodo);
    res.json(newTodo)

})



router.put('/todos/:id', (req, res) => {

    const id = parseInt(req.params.id);
    const { task, tags, status } = req.body;

    const todoIndex = todoArr.findIndex((t) => t.id === id)
    if (todoIndex === -1) {
        return res.status(400).json({ message: "Todo not found " })
    }

    if (task) {
        todoArr[todoIndex].task = task
    }
    if (tags) {
        todoArr[todoIndex].tags = tags
    }
    if (status) {
        todoArr[todoIndex].status = status
    }

    res.json(todoArr[todoIndex]);
})



router.delete('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const todoIndex = todoArr.findIndex((t) => t.id === id)
    if (todoIndex === -1) {
        return res.status(400).json({ message: "Todo not found " })
    }

    todoArr.slice(todoIndex, 1)
    res.json({ message: 'Todo deleted sucessfully' })
})

module.exports = router