const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

let tasks = [];
let idCounter = 1;

app.get('/tasks', (req, res) => {
    res.json(tasks);
});

app.post('/tasks', (req, res) => {
    const { text } = req.body;
    const newTask = { id: idCounter++, text, completed: false };
    tasks.push(newTask);
    console.log('Tareas actuales:', tasks);
    res.status(201).json(newTask);
});

app.put('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const task = tasks.find(t => t.id == id);
    if (task) {
        task.completed = !task.completed;
        res.json(task);
    } else {
        res.status(404).json({ error: 'Task not found' });
    }
});

app.delete('/tasks/:id', (req, res) => {
    const { id } = req.params;
    tasks = tasks.filter(t => t.id != id);
    res.status(204).end();
});

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});
