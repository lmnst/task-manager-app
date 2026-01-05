import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import './TaskPage.css'

interface Task {
  _id: string;
  title: string;
  isCompleted: boolean;
  priority: 'Low' | 'Medium' | 'High';
}


const TaskPage: React.FC = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [title,setTitle] = useState('');
  const [priority, setPriority] = useState('Low');
  const [editingId, setEditingId] = useState<string | null >(null);
  const [editText, setEditText] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'board'>('list');
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
      console.error(error);
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

      await axios.post(`${API_URL}/api/tasks`, { 
        title,
        priority
      }, config);

      setTitle('');
      setPriority('Low');
      fetchTasks();
    } catch (error) {
      console.error('Task addition failed', error);
      alert('Addition failed');
    }
  };

  const handleToggle = async (task:Task) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${userInfo?.token}`},
      };
      
      await axios.put(
        `${API_URL}/api/tasks/${task._id}`,
        { isCompleted: !task.isCompleted },
        config
      );
      fetchTasks();
    } catch (error) {
      console.error('Update failed', error);
      alert('Operation failed');
    }
  }; 

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete?'))return;

    try{
      const config = {
        headers: {Authorization: `Bearer ${userInfo?.token}`},
      };

      await axios.delete(`${API_URL}/api/tasks/${id}`, config);

      fetchTasks();
    } catch (error) {
      console.error('Delete failed', error);
    }
      
  };

  const startEditing = (task: Task) => {
    setEditingId(task._id);
    setEditText(task.title);
  }

  const saveEdit = async (id: string) => {
    try{
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo?.token}`
        }
      }

      await axios.put(`${API_URL}/api/tasks/${id}`,
        { title: editText},
        config
      );
      setEditingId(null);
      fetchTasks();
    } catch (error) {
      alert('Update failed');
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText('');
  }

  const getPriorityColor = (p: string) => {
    switch(p) {
      case 'High' : return '#ff4d4d';
      case 'Medium' : return '#ffad33';
      default : return '#4caf50';
    }
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.isCompleted === b.isCompleted) return 0;
    return a.isCompleted ? 1 : -1;
  });

  return (
    <div className="task-container">
      <h1 className="task-header">Task Manager</h1>
      <div style={{display: 'flex', justifyContent: 'center', marginBottom: '20px', gap: '10px'}}>
        <button
          className={`btn ${viewMode === 'list' ? 'btn-add' : ''}`}
          onClick={() => setViewMode('list')}
          style={{ background: viewMode === 'list' ? '#007bff' : '#eee', color: viewMode === 'list' ? 'white' : '#333'}}>
            📋 List View
          </button>
          <button
            className={`btn ${viewMode === 'board' ? 'btn-add' : ''}`}
            onClick={ () => setViewMode('board')}
            style={{ background: viewMode === 'board'? '#007bff' : '#eee', color: viewMode === 'board' ? 'white' : '#333'}}
          >
            📊 Board View
          </button>
      </div>
      <form onSubmit={handleAddTask} className="add-task-form">
        <input 
          className="task-input"
          type="text" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new task..."
        />
        <select 
          className="priority-select"
          value={priority} 
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button type="submit" className="btn btn-add">Add</button>
      </form>

      {viewMode === 'list' ? (
        <ul className="task-list">
        {sortedTasks.map((task) => (
          <li key={task._id} className="task-item" style={{ borderLeft: `6px solid ${getPriorityColor(task.priority)}` }}>
            
            <div className="task-content">
              <input 
                type="checkbox" 
                checked={task.isCompleted} 
                onChange={() => handleToggle(task)}
                style={{ width: '20px', height: '20px', cursor: 'pointer' }}
              />

              {/* 🔄 条件渲染：如果是编辑模式，显示输入框；否则显示文本 */}
              {editingId === task._id ? (
                <div style={{ display: 'flex', gap: '5px' }}>
                    <input 
                        value={editText} 
                        onChange={(e) => setEditText(e.target.value)}
                        className="task-input"
                        style={{ padding: '5px' }}
                    />
                    <button onClick={() => saveEdit(task._id)} className="btn btn-add" style={{padding: '5px 10px'}}>Save</button>
                    <button onClick={cancelEdit} className="btn" style={{padding: '5px 10px', background: '#ccc'}}>Cancel</button>
                </div>
              ) : (
                <span className={task.isCompleted ? 'task-title task-completed' : 'task-title'}>
                    {task.title}
                    <span className="priority-tag" style={{ backgroundColor: getPriorityColor(task.priority) }}>
                    {task.priority}
                    </span>
                </span>
              )}
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
                {/* 只有在非编辑模式下才显示 Edit 和 Delete */}
                {editingId !== task._id && (
                    <>
                        <button 
                            onClick={() => startEditing(task)}
                            className="btn" 
                            style={{ background: '#f0ad4e', color: 'white', padding: '6px 12px', fontSize: '14px' }}
                        >
                            Edit
                        </button>
                        <button 
                            onClick={() => handleDelete(task._id)}
                            className="btn btn-delete"
                        >
                            Delete
                        </button>
                    </>
                )}
            </div>
          </li>
        ))}
      </ul>
    ) : (
      <div className="board-container">
        {['High', 'Medium', 'Low'].map(level => (
          <div key={level} className="board-column">
            <h3 style={{ borderBottom: `4px solid ${getPriorityColor(level)}`, paddingBottom: '10px' }}>
              {level} Priority
            </h3>
            <div className="board-tasks">
              {/* 只筛选出当前优先级的任务 */}
              {tasks
                .filter(t => t.priority === level)
                .map(task => (
                  <div key={task._id} className="board-card" style={{ opacity: task.isCompleted ? 0.6 : 1 }}>
                    {/* 简单的卡片内容 */}
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <span style={{ textDecoration: task.isCompleted ? 'line-through' : 'none', fontWeight: 'bold' }}>
                            {task.title}
                        </span>
                        <input 
                            type="checkbox" 
                            checked={task.isCompleted} 
                            onChange={() => handleToggle(task)} 
                        />
                    </div>
                    {/* 在看板里也允许删除，或者为了简洁可以先不放编辑按钮 */}
                    <div style={{marginTop: '10px', textAlign: 'right'}}>
                        <button onClick={() => handleDelete(task._id)} className="btn-delete" style={{fontSize: '12px', padding: '4px 8px'}}>Del</button>
                    </div>
                  </div>
                ))}
                {tasks.filter(t => t.priority === level).length === 0 && <p style={{color: '#999', fontStyle: 'italic'}}>Empty</p>}
            </div>
          </div>
        ))}
      </div>
    )}
    </div>
  );
};
export default TaskPage;


