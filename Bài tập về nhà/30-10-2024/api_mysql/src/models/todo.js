const db = require('../configs/database');

const Todo = {
    getAll: (callback) => {
        db.query('SELECT * FROM tasks', callback);
    },
    add: (task, callback) => {
        const { name, date, completed, color } = task;
        db.query('INSERT INTO tasks (name, date, completed, color) VALUES (?, ?, ?, ?)', [name, date, completed, color], callback);
    },
    update: (id, task, callback) => {
        const { name, date, completed, color } = task;
        db.query('UPDATE tasks SET name = ?, date = ?, completed = ?, color = ? WHERE id = ?', [name, date, completed, color, id], callback);
    },
    delete: (id, callback) => {
        db.query('DELETE FROM tasks WHERE id = ?', [id], callback);
    }
};

module.exports = Todo;