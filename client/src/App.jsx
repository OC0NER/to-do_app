import { useEffect, useState } from 'react';

const API_URL = 'http://localhost:3001/tasks';

function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState('');

  const fetchTasks = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.error('Error fetching tasks:', err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (!text.trim()) return;
    try {
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      });
      setText('');
      fetchTasks();
    } catch (err) {
      console.error('Error adding task:', err);
    }
  };

  const toggleComplete = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'PUT' });
      fetchTasks();
    } catch (err) {
      console.error('Error toggling task:', err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      fetchTasks();
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">To-Do List</h1>
      <div className="flex mb-4">
        <input
          className="flex-1 border p-2 mr-2 rounded"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Escribe una tarea"
        />
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 rounded" onClick={addTask}>+</button>
      </div>
      <ul>
        {tasks.map(task => (
          <li key={task.id} className="flex justify-between items-center mb-2">
            <span
              onClick={() => toggleComplete(task.id)}
              className={`cursor-pointer ${task.completed ? 'line-through text-gray-500' : ''}`}
            >
              {task.text}
            </span>
            <button onClick={() => deleteTask(task.id)} className="text-red-500 hover:text-red-700">x</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
