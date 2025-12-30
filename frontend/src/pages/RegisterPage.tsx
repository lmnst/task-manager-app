// // src/pages/RegisterPage.tsx
// import React, { useState } from 'react';
// import axios from 'axios'; // 1. 引入 axios
// import './RegisterPage.css';

// const RegisterPage: React.FC = () => {
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = async (event: React.FormEvent) => { // 2. 将函数标记为 async
//     event.preventDefault();
    
//     try {
//       // 3. 构造要发送的数据
//       const newUser = {
//         username,
//         email,
//         password,
//       };

//       // 4. 使用 axios 发送 POST 请求到你的后端API
//       // !!! 注意：请将 URL 替换成你自己的后端注册接口地址 !!!
//       const response = await axios.post('http://localhost:5001/api/users/register', newUser);

//       // 5. 处理成功响应
//       console.log('注册成功:', response.data);
//       alert('注册成功！即将跳转到登录页面。');
//       // 在实际应用中，这里我们会使用 react-router-dom 进行跳转
//       // 比如：navigate('/login');

//     } catch (error) {
//       // 6. 处理错误响应
//       console.error('注册失败:', error);
//       alert('注册失败，请检查你的输入或稍后再试。');
//     }
//   };

//   return (
//     <div className="form-container">
//       {/* JSX 结构保持不变 */}
//       <div className="form-card">
//         <h1>创建你的账户</h1>
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label htmlFor="username">用户名</label>
//             <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
//           </div>
//           <div className="form-group">
//             <label htmlFor="email">邮箱</label>
//             <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//           </div>
//           <div className="form-group">
//             <label htmlFor="password">密码</label>
//             <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
//           </div>
//           <button type="submit" className="submit-btn">注册</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default RegisterPage;

import axios from 'axios';
import './RegisterPage.css';
import React, { useState } from 'react';

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const newUser = {
        username,
        email,
        password
      };

      const API_URL = import.meta.env.VITE_API_BASE_URL;
      const response = await axios.post(`${API_URL}/api/users/register`, newUser);

      console.log('Sign up Successfully:', response.data);
      alert('Registration successful! You will be redirected to the login page shortly.');

    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed. Please check your input or try again later.');
    }
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <h1>Create Your Account</h1> 
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor='password'>Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="submit-btn">Register</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;



{/* 问题1：在 HTML 中找到 id="root" 的元素，我们现在还没有html文件，这个是在哪的文件？哦哦是index.html，这个文件是个什么文件，我们是不是暂时还没开始写这个文件

问题2：作用：导入 ReactDOM，这是 React 和浏览器 DOM 之间的"桥梁"。浏览器 DOM是什么*/}