const express = require('express');
const app = express();
const todoController = require('../controller/todoController'); // import từ controllers

app.get('/', todoController.getAllTodos);
app.post('/add', todoController.addTodo);
app.put('/update/:id', todoController.updateTodo);
app.delete('/delete/:id', todoController.deleteTodo);

module.exports = app;