// // src/App.tsx

// import { Routes, Route, Navigate } from 'react-router-dom'; 

// import LoginPage from './pages/LoginPage.tsx';
// import RegisterPage from './pages/RegisterPage.tsx';
// import Navbar from './components/Navbar.tsx';
// import TasksPage from './pages/TasksPage.tsx'; // 1. 引入 TasksPage

// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <Navbar />
//       <main>
//         <Routes>
//           <Route path="/login" element={<LoginPage />} />
//           <Route path="/register" element={<RegisterPage />} />
//           <Route path="/tasks" element={<TasksPage />} /> {/* 2. 添加新路由 */}
//           <Route path="/" element={<Navigate to="/login" />} />
//         </Routes>
//       </main>
//     </div>
//   );
// }

// export default App;



import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';

import LoginPage from './pages/LoginPage.tsx';
import RegisterPage from './pages/RegisterPage.tsx';
import Navbar from './components/Navbar.tsx';

import './App.css';

function App() {
  return (
    <div className='APP'>
      <Navbar />
      <main>
        <Routes>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/register" element={<RegisterPage / >}/>

          <Route path="/" element={<Navigate to="/login"/>}/>
        </Routes>
      </main>
    </div>
  );
}

export default App;