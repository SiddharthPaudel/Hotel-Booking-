import { useEffect, useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa'; // Import profile icon
import { useAuth } from "../context/AuthContext"; // Import the useAuth hook
import './Header.css'; // Retain this for other styles
import profile from "../assets/user.png";
const Header = () => {
  const { user, logout } = useAuth(); // Access user and logout from context
  const navigate = useNavigate();

  // Handle logout
  const handleLogout = () => {
    logout();  // Call logout from context
    navigate('/login');
  };

  return (
    <header className="p-3 mb-3 bottom header-container">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-between">
          <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 link-body-emphasis text-decoration-none">
            <h1>
              <span className="quick-text">Quick</span>
              <span className="stay-text">Stay</span>
            </h1>
          </a>

          <ul className="nav col-12 col-lg-auto mb-2 justify-content-center mb-md-0">
            <li>
              <NavLink to="/" className="nav-link px-3">Home</NavLink>
            </li>
            <li>
              <NavLink to="/about" className="nav-link px-3">About Us</NavLink>
            </li>
            <li>
              <NavLink to="/customers" className="nav-link px-3">Service</NavLink>
            </li>
            <li>
              <NavLink to="/hotel" className="nav-link px-3">Hotels</NavLink>
            </li>
          </ul>

          <div className="d-flex flex-wrap align-items-center justify-content-end">
            {user ? (
            <div className="dropdown">
            <button
              className="btn btn-link dropdown-toggle p-0"
              type="button"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              aria-label="User Profile"
            >
              <img
                src={profile} // Use the user's profile picture URL
                alt="Profile"
                className="img-fluid rounded-circle"
                style={{ width: '30px', height: '30px' }} // Set the image size
              />
            </button>
            <ul className="dropdown-menu dropdown-menu-end shadow-lg p-2" aria-labelledby="dropdownMenuButton">
              {/* Display user's profile info */}
              <li><a className="dropdown-item" href="/profile">Profile</a></li>
              <li><a className="dropdown-item" href="#">{user.email}</a></li> {/* Display user's email */}
              <li><hr className="dropdown-divider" /></li>
              <li><a className="dropdown-item" onClick={handleLogout}>Logout</a></li>
            </ul>
          </div>
          
           
           
            ) : (
              <div className="d-flex">
                <Link to="/login" className="btn btn-outline me-2 fw-semibold">Login</Link>
                <Link to="/signup" className="btn btn-primary fw-semibold">Sign Up</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
