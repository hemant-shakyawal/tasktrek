require("dotenv").config();
const express = require('express');
const todoRoutes = require('./router/todo')

const app = express();


app.use(express.json()); // middleware for post data

app.use('/api', todoRoutes)

const PORT = process.env.PORT || 3000
app.listen(3000, () => {
    console.log(`Server is listening on port ${PORT}`);
});