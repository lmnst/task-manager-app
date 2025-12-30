// // src/components/Navbar.tsx
// import React from 'react';
// import { Link } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext'; // 1. 引入 useAuth Hook
// import './Navbar.css';

// const Navbar: React.FC = () => {
//   const { userInfo, logout } = useAuth(); // 2. 从 Context 中获取 userInfo 和 logout 方法

//   return (
//     <nav className="navbar">
//       <div className="navbar-container">
//         <Link to="/" className="navbar-logo">
//           任务管理器
//         </Link>
        
//         <ul className="nav-menu">
//           {/* 3. 使用条件渲染 */}
//           {userInfo ? (
//             // 如果 userInfo 存在 (用户已登录)
//             <>
//               <li className="nav-item">
//                 <span className="nav-links">你好, {userInfo.username}</span>
//               </li>
//               <li className="nav-item">
//                 <a onClick={logout} className="nav-links" style={{cursor: 'pointer'}}>
//                   登出
//                 </a>
//               </li>
//             </>
//           ) : (
//             // 如果 userInfo 不存在 (用户未登录)
//             <>
//               <li className="nav-item">
//                 <Link to="/login" className="nav-links">
//                   登录
//                 </Link>
//               </li>
//               <li className="nav-item">
//                 <Link to="/register" className="nav-links">
//                   注册
//                 </Link>
//               </li>
//             </>
//           )}
//         </ul>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


//src/components/Navbar.tsx

import React from 'react';
import { Link } from 'react-router-dom'; //???
import './Navbar.css';
import { useAuth } from '../context/AuthContext';


const Navbar: React.FC = () => {
  const { userInfo, logout} = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* */}
        <Link to="/" className="navbar-logo">
          Task Manager
        </Link>

        <ul className='nav-menu'>
          {
            userInfo ? (
              <>
                <li className='nav-item'>
                  <span className='nav-links'>Hello, {userInfo.username}</span>
                </li>
                <li className='nav-item'>
                  <button onClick={logout} className='nav-links' style={{cursor: 'pointer', background: 'none', border: 'none', color: 'white'}}>
                    logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className='nav-item'>
                  <Link to="/login" className='nav-links'>Sign in</Link>
                </li>
                <li className='nav-item'>
                  <Link to="/register" className='nav-links'>Sign up</Link>
                </li>
              </>
            )
          }
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;