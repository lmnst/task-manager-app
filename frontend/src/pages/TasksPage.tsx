import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const TaskPage: React.FC = () => {
  const[tasks, setTasks] = useState<any[]>([]);
  const[title,setTitle] = useState('');
  const { userInfo } = useAuth(); //Obtain the token from the global state

  const API_URL = import.meta.env.VITE_API_BASE_URL;

  const fetchTasks = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo?.token}`,
        },
      };

      const { data } = await axios.get(`${API_URL}/api/tasks`, config);
      setTasks(data);
    } catch (error) {
      console.error('Task retrieval failed', error);
    }
  };

  useEffect(() => {
    if (userInfo) {
      fetchTasks();
    }
  }, [userInfo]);

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    try {
      const config = {
        headers: { Authorization: `Bearer ${userInfo?.token}` },
      };

      await axios.post(`${API_URL}/api/tasks`, { title }, config);

      setTitle('');
      fetchTasks();
    } catch (error) {
      console.error('Task addition failed', error);
      alert('Addition failed');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>My Tasks</h1>

      <form onSubmit={handleAddTask} style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder='What need to be done?'
          style={{ flex: 1, padding: '10px'}}
        />
        <button type='submit' style={{ padding: '10px 20px', cursor: 'pointer' }}>
          Add Task
        </button>
      </form>

      <ul style={{ listStyle: 'none', padding: 0}}>
        {tasks.map((task) => (
          <li key={task._id} style={{
            background: '#f4f4f4', 
            margin: '10px 0', 
            padding: '10px',
            display: 'flex',
            justifyContent: 'space-between'
          }}>
            <span>{task.title}</span>
            <span>{task.isCompleted ? '✅' : '⏳'}</span>
          </li>
        ))}
      </ul>

      {tasks.length === 0 && <p>No tasks yet. Add one!</p>}
    </div>
  );
};
export default TaskPage;


