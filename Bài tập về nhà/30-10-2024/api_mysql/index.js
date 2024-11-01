const express = require('express');
const app = express();  
const port = 3001;
const db = require('./src/configs/database');
const todoRoutes = require('./src/routes/todoRoutes');

app.use(express.json());    

app.listen(port, () => {    
    console.log(`Server is running at http://localhost:${port}`);
});

app.use('/api', todoRoutes); // Sử dụng các route đã định nghĩa

// GET endpoint
app.get('/', (req, res) => {
    db.query('SELECT * FROM tasks', (err, result) => {
        if (err) {
            console.log('Error:', err);
            return res.status(500).send('Server error');
        }
        res.json(result);
    });
});

// POST endpoint
app.post('/add', (req, res) => {
    const { name, date, completed, color } = req.body;
    db.query('INSERT INTO tasks (name, date, completed, color) VALUES (?, ?, ?, ?)', [name, date, completed, color], (err, result) => {
        if (err) {
            console.log('Error:', err);
            return res.status(500).send('Server error');
        }
        res.status(201).send('Task added');
    });
});

// PUT endpoint
app.put('/update/:id', (req, res) => {
    const { id } = req.params;
    const { name, date, completed, color } = req.body;
    db.query('UPDATE tasks SET name = ?, date = ?, completed = ?, color = ? WHERE id = ?', [name, date, completed, color, id], (err, result) => {
        if (err) {
            console.log('Error:', err);
            return res.status(500).send('Server error');
        }
        res.send('Task updated');
    });
});

// DELETE endpoint
app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM tasks WHERE id = ?', [id], (err, result) => {
        if (err) {
            console.log('Error:', err);
            return res.status(500).send('Server error');
        }
        res.send('Task deleted');
    });
});