import React, { useState } from 'react';
import './Registration.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
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
    setError('');

    if (!username || !email || !password) {
      setError('Please enter username, email, and password');
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
      const existingUserResponse = await axios.get(`http://localhost:3001/users?email=${email}`);
      if (existingUserResponse.data.length > 0) {
        setError('Email is already registered. Please log in or use another email.');
        return;
      }

      console.log('Sending registration data:', { username, email, password });
      const response = await axios.post('http://localhost:3001/users', {
        username,
        email,
        password,
      });

      console.log('Registration response:', response);

      if (response.status === 201) {
        console.log('Registration successful! Redirecting to login...');
        navigate('/login');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="login">
      <div className="login-container">
        <h2 className="log">Register to Inventory System</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
            />
          </div>
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
          <button type="submit" className="btn-login">Register</button>
        </form>
        <p>
          Already have an account?&nbsp;&nbsp;
          <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
