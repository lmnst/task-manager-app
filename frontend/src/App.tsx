import { Routes, Route, Navigate } from 'react-router-dom'; 
import LoginPage from './pages/LoginPage.tsx';
import RegisterPage from './pages/RegisterPage.tsx';
import Navbar from './components/Navbar.tsx';
import TasksPage from './pages/TasksPage.tsx';
import ProtectedRouter from './components/ProtectedRoutr.tsx';
import './App.css';

function App() {
  return (
    <div className='APP'>
      <Navbar />
      <main>
        <Routes>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/register" element={<RegisterPage/>}/>
          <Route path="/" element={<Navigate to="/login"/>}/>
          <Route element={<ProtectedRouter />} >
            <Route path='/tasks' element={<TasksPage/>}/>
          </Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;