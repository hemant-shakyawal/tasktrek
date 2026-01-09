require("dotenv").config();
const express = require('express');
const todoRoutes = require('./router/todo')

const app = express();

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL, {
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.error("Error connecting to MongoDB", err);
});

app.use(express.json()); // middleware for post data

app.use('/api', todoRoutes)

const PORT = process.env.PORT || 3000
app.listen(3000, () => {
    console.log(`Server is listening on port ${PORT}`);
});