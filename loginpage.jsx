import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }
  
    
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }
  
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }
  
    try {
      
      const response = await axios.get('http://localhost:3001/users');
      const users = response.data;
  
     
      const user = users.find(user => user.email === email && user.password === password);
  
      if (user) {
        
        console.log('Login successful! Redirecting to home...');
        navigate('/home');
      } else {
        
        setError('Invalid email or password');
      }
    } catch (error) {
      console.error('Error during authentication:', error);
      setError('An error occurred. Please try again later.');
    }
  };
  

  return (
    <div className="login">
      <div className="login-container">
        <h2 className="log">Login to Inventory System</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button type="submit" className="btn-login">Login</button>
        </form>
        <p>
          Don't have an account?&nbsp;&nbsp;
          <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
