const mongoose = require('mongoose');
const todoSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['todo', 'pending', 'done'],
        default: 'todo'
    },
    tags: {
        type: [String],
        default: []
    },
});

const Todo = mongoose.model('Todo', todoSchema);
module.exports = Todo