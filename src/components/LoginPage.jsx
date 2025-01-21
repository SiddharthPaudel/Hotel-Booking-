import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import { toast, ToastContainer } from 'react-toastify'; // Import toastify
import 'react-toastify/dist/ReactToastify.css'; // Import toastify CSS
import './LoginPage.css';

const LoginPage = () => {
  const navigate = useNavigate(); // Initialize the navigate function
  const [email, setEmail] = useState(''); // State for email
  const [password, setPassword] = useState(''); // State for password

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      // Send a POST request to the login API
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        // Show success toast
        toast.success('Login successful!', {
          position: 'top-center',
          autoClose: 3000,
        });

        // Save the token (e.g., in localStorage)
        localStorage.setItem('token', data.token);

        // Navigate to the dashboard
        setTimeout(() => navigate('/hotel'), 3000); // Navigate after toast
      } else {
        // Show error toast
        toast.error('Invalid email or password', {
          position: 'top-center',
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      // Show error toast for unexpected errors
      toast.error('Something went wrong. Please try again later.', {
        position: 'top-center',
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <div className="head">
          <h2>Login</h2>
        </div>

        {/* Welcome Back Text */}
        <div className="welcome-back">
          <p>Welcome Back! Please login to continue.</p>
        </div>

        {/* Email Input */}
        <div className="input-container">
          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              id="floatingEmail"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update email in state
              required
            />
            <label htmlFor="floatingEmail">Email</label>
          </div>
        </div>

        {/* Password Input */}
        <div className="input-container">
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Update password in state
              required
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>
        </div>

        <div className="forget-container">
          <p className="forget">Forgot Password?</p>
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

      {/* Toast Container for Notifications */}
      <ToastContainer />
    </div>
  );
};

export default LoginPage;
