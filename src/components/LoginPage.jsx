import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import './LoginPage.css';

const LoginPage = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  const handleLogin = (e) => {
    e.preventDefault(); // Prevent default form submission

    // Simulate login logic here
    const isAuthenticated = true; // Replace with actual authentication logic

    if (isAuthenticated) {
      // Navigate to the dashboard after successful login
      navigate('/dashboard');
    } else {
      alert('Invalid username or password'); // Handle failed login attempt
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}> {/* Add onSubmit handler */}
        <div className="head">
          <h2>Login</h2>
        </div>
        
        {/* Welcome Back Text */}
        <div className="welcome-back">
          <p>Welcome Back! Please login to continue.</p>
        </div>

        <div className="input-container">
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="floatingUsername"
              placeholder="Enter your username"
              required
            />
            <label htmlFor="floatingUsername">Username</label>
          </div>
        </div>

        <div className="input-container">
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Enter your password"
              required
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>
        </div>

        <div className="forget-container">
          <p className="forget">Forget Password?</p>
        </div>

        <button className="btn btn-primary login-btn" type="submit">
          Login
        </button>

        {/* Signup Redirection */}
        <div className="signup-link">
          <p>
            Don't have an account?{' '}
            <a href="/signup" className="signup-link-text">Signup</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
