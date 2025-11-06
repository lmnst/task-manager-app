// src/context/AuthContext.tsx

import React, { createContext, useState, useEffect, useContext, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

// 1. 定义存储在 localStorage 中的用户信息类型
interface UserInfo {
  _id: string;
  username: string;
  email: string;
  token: string;
}

// 2. 定义 Context 将要提供的数据和方法的类型
interface AuthContextType {
  userInfo: UserInfo | null;
  login: (data: UserInfo) => void;
  logout: () => void;
}

// 3. 创建 Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 4. 创建一个 Provider 组件
// ReactNode 类型用于表示任何可以被渲染的React子元素
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const navigate = useNavigate();

  // 5. 使用 useEffect 在应用加载时检查 localStorage
  useEffect(() => {
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    }
  }, []); // 空依赖数组意味着这个effect只在组件首次挂载时运行一次

  // 登录方法
  const login = (data: UserInfo) => {
    localStorage.setItem('userInfo', JSON.stringify(data));
    setUserInfo(data);
    navigate('/tasks');
  };

  // 登出方法
  const logout = () => {
    localStorage.removeItem('userInfo');
    setUserInfo(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ userInfo, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 6. 创建一个自定义 Hook，方便其他组件使用 Context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};