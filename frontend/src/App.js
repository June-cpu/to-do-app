import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');


  useEffect(() => {
    axios.get('http://localhost:5000/api/tasks').then(res => setTasks(res.data));
  }, []);

 
  const addTask = () => {
    axios.post('http://localhost:5000/api/tasks', { title }).then(res => {
      setTasks([...tasks, res.data]);
      setTitle('');
    });
  };

 
  const deleteTask = (id) => {
    axios.delete(`http://localhost:5000/api/tasks/${id}`).then(() => {
      setTasks(tasks.filter(task => task._id !== id));
    });
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <input
        type="text"
        placeholder="New Task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={addTask}>Add</button>

      <ul>
        {tasks.map(task => (
          <li key={task._id}>
            {task.title}
            <button onClick={() => deleteTask(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
