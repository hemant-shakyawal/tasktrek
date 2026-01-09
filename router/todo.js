const express = require("express")
const router = express.Router()
const Todo = require("../models/todo")


router.get('/todos', async (req, res) => {
    const todos = await Todo.find();// fetch all todos from mongodb
    //const todos = await Todo.find({ tags: "React" });// fetch react tagged todos from mongodb

    //  const todos = await Todo.find({ tags: "HTML", status: "todo" });// fetch html tagged todos from mongodb
    //const todos = await Todo.countDocuments({ status: "Done" });// fetch count of done todos from mongodb
    //const todos = await Todo.find({ task: /\bCreate\b/i });// fetch todos from mongodb with task containing 'create' word

    console.log(todos);
    res.json(todos);

});

router.get('/todos/:id', (req, res) => {

    const todoId = parseInt(req.params.id);
    const todo = todoArr.find((t) => t.id = todoId)
    res.send(todo)
});


router.post('/todos', async (req, res) => {
    const todo = req.body;
    // const newTodo = {
    //     id: todoArr[todoArr.length - 1].id + 1,
    //     task: todo.task,
    //     tags: todo.tags,
    //     status: todo.status

    // }

    // todoArr.push(newTodo);

    const newTodo = new Todo({
        task: todo.task,
        tags: todo.tags,
        status: todo.status
    })
    const storedTodo = await newTodo.save();
    console.log(storedTodo);
    res.status(201).json(storedTodo);

})



router.put('/todos/:id', async (req, res) => {

    const id = req.params.id;
    const { task } = req.body;
    // For update one filed
    // const updatedTodo = await Todo.findByIdAndUpdate(
    //     id,
    //     { $set: { task: task } },
    //     { new: true, runValidators: true }
    // );

    //for update multiple fields
    const updatedTodo = await Todo.updateMany(
        { status: "todo" },
        { $set: { status: "done" } },

    );

    res.json(updatedTodo);
})



router.delete('/todos/:id', async (req, res) => {
    const id = req.params.id;
    const result = await Todo.deleteOne({ _id: id })
    res.json({ result: result, message: 'Todo deleted successfully' })
})

module.exports = router