const express = require('express');

// ✅ Call express()
const app = express();

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

app.use(express.json()); // middleware for post data
app.get('/', (req, res) => {
    res.send('task is created');
});
app.get('/todos', (req, res) => {
    res.send(todoArr);
});
app.get('/todos/:id', (req, res) => {

    const todoId = parseInt(req.params.id);
    const todo = todoArr.find((t) => t.id = todoId)
    res.send(todo)
});


app.post('/todos', (req, res) => {
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



app.put('/todos/:id', (req, res) => {

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



app.delete('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const todoIndex = todoArr.findIndex((t) => t.id === id)
    if (todoIndex === -1) {
        return res.status(400).json({ message: "Todo not found " })
    }

    todoArr.slice(todoIndex, 1)
    res.json({ message: 'Todo deleted sucessfully' })
})
const PORT = process.env.PORT || 3000
app.listen(3000, () => {
    console.log(`Server is listening on port ${PORT}`);
});