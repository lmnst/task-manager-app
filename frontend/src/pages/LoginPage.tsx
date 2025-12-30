// // src/pages/LoginPage.tsx

// import React, { useState } from 'react';
// import axios from 'axios';
// // 从 react-router-dom 移除 useNavigate，因为我们的 context 会处理跳转
// import { useAuth } from '../context/AuthContext'; // 1. 引入 useAuth
// import './LoginPage.css';

// const LoginPage: React.FC = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const { login } = useAuth(); // 2. 从 context 获取 login 方法

//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();

//     try {
//       const loginData = { email, password };
//       const response = await axios.post('http://localhost:5001/api/users/login', loginData);
      
//       // 3. 调用 context 的 login 方法，传入后端返回的数据
//       login(response.data);
      
//       // 我们不再需要在这里 alert 和 navigate，login方法会处理一切

//     } catch (error) {
//       console.error('登录失败:', error);
//       alert('登录失败，邮箱或密码错误！');
//     }
//   };

//   // ... return (...) JSX部分保持不变 ...
//   return (
//     <div className="form-container">
//       <div className="form-card">
//         <h1>登录您的账户</h1>
//         <form onSubmit={handleSubmit}>
//           {/* ... inputs ... */}
//           <div className="form-group">
//             <label htmlFor="email">邮箱</label>
//             <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//           </div>
//           <div className="form-group">
//             <label htmlFor="password">密码</label>
//             <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
//           </div>
//           <button type="submit" className="submit-btn" style={{backgroundColor: '#007bff'}}>登录</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;


import axios from 'axios';
import './LoginPage.css';
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login } = useAuth();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if(!email || !password) {
      alert('Please input the email and the password!')
      return;
    }

    try {
      const API_URL = import.meta.env.VITE_API_BASE_URL;
      const response = await axios.post(`${API_URL}/api/users/login`, {
        email,
        password,
      });

      console.log('Login successful:', response.data);

      login(response.data);

      alert('Login successful! Redirecting...')
    } catch (error: any) {
      const message = error.response?.data?.message ||'Login failed. Please check your username and password.';
      console.log('Error message:', message);
      alert(message);
    }
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className='form-group'>
            <label>password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type='submit' className='submit-btn'>Login</button>
        </form>
      </div>
    </div>
  );


};





export default LoginPage;