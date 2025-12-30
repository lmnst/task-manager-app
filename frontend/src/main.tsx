// // src/main.tsx

// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { BrowserRouter } from 'react-router-dom';
// import { AuthProvider } from './context/AuthContext'; // 1. 引入 AuthProvider
// import App from './App.tsx';
// import './index.css';

// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <React.StrictMode>
//     {/* 2. 用 AuthProvider 包裹 BrowserRouter */}
//     <AuthProvider>
//       <BrowserRouter>
//         <App />
//       </BrowserRouter>
//     </AuthProvider>
//   </React.StrictMode>
// );

// src/main.tsx

import React from 'react';

import ReactDOM from 'react-dom/client';

import { BrowserRouter } from 'react-router-dom';

import App from './App.tsx';

import { AuthProvider } from './context/AuthContext'; // 1. 引入 AuthProvider

import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>        
      <AuthProvider>       
        <App />            
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

