import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './SignUpPage.css';
import { Navigate } from 'react-router-dom';

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [redirect, setRedirect] = useState(false);

if (redirect) {
  return <Navigate to="/login" />;
}

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match. Please try again.');
      return;
    }
    
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        role: 'user', // Default role
      });
  
      const { user } = response.data; // Ensure this has the customerId you expect
      console.log('Backend Response:', response.data); // Log response to check customerId
      if (user && user._id) {
        const userData = { customerId: user._id, username: user.username, email: user.email };
        console.log('User Data:', userData); // Verify userData
  
        // Save user data in localStorage
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('customerId', userData.customerId); // Ensure customerId is saved
  
        toast.success('Registration successful! You can now log in.');
  
        setTimeout(() => (window.location.href = '/login'), 2000); // Redirect after 2 seconds
      } else {
        console.log('User data is incomplete or missing customerId.');
      }
    } catch (err) {
      toast.error('Registration failed. Please try again.');
      console.error(err);
    }
  };
  
  
  

  return (
    <div className="registration-container">
      <form className="registration-form" onSubmit={handleSubmit}>
        <div className="head">
          <h2>Register</h2>
        </div>
        <p className="welcome-back">Welcome! Please fill in the details to create an account.</p>

        <div className="input-row">
          <div className="input-container">
            <p>Username:</p>
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Enter your name"
                value={formData.username}
                onChange={handleChange}
              />
              <label htmlFor="username">Username</label>
            </div>
          </div>
          <div className="input-container">
            <p>Email:</p>
            <div className="form-floating">
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
              <label htmlFor="email">Email</label>
            </div>
          </div>
        </div>

        <div className="input-row">
          <div className="input-container">
            <p>Password:</p>
            <div className="form-floating">
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
              />
              <label htmlFor="password">Password</label>
            </div>
          </div>
          <div className="input-container">
            <p>Confirm Password:</p>
            <div className="form-floating">
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <label htmlFor="confirmPassword">Confirm Password</label>
            </div>
          </div>
        </div>

        <button className="btn btn-primary register-btn" type="submit">
          Register
        </button>

        {error && <p className="error-message">{error}</p>}

        <div className="login-link">
          Already have an account?{' '}
          <span
            className="login-link-text"
            onClick={() => (window.location.href = '/login')}
          >
            Login
          </span>
        </div>
      </form>

      <ToastContainer />
    </div>
  );
};

export default SignUpPage;
