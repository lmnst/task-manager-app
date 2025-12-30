import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const TaskPage: React.FC = () => {
  const[tasks, setTasks] = useState<any[]>([]);
  const { userInfo } = useAuth(); //Obtain the token from the global state

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_BASE_URL;

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

    if (userInfo) {
      fetchTasks();
    }
  }, [userInfo]);

  return (
    <div style={{ padding: '20px' }}>
      <h1>My Tasks</h1>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            <strong>{task.title}</strong> - {task.isCompleted ? '✅' : '⏳'}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default TaskPage;


// const TasksPage: React.FC = () => {
//   return (
//     <div>
//       <h1>我的任务列表</h1>
//       <p>(这里将是我们的任务管理主界面)</p>
//     </div>
//   );
// };

// export default TasksPage;