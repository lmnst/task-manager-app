import axios from 'axios';
import './RegisterPage.css';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

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
      navigate('/login');

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

