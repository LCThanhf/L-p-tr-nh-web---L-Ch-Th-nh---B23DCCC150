const Todo = require('../models/todo');

exports.getAllTodos = (req, res) => {
    Todo.getAll((err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.status(200).json(results);
    });
};

exports.addTodo = (req, res) => {
    const { name, date, completed, color } = req.body;
    Todo.add({ name, date, completed, color }, (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.status(201).json({ message: 'Task added', id: result.insertId });
    });
};

exports.updateTodo = (req, res) => {
    const { id } = req.params;
    const { name, date, completed, color } = req.body;
    Todo.update(id, { name, date, completed, color }, (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.status(200).json({ message: 'Task updated' });
    });
};

exports.deleteTodo = (req, res) => {
    const { id } = req.params;
    Todo.delete(id, (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.status(200).json({ message: 'Task deleted' });
    });
};