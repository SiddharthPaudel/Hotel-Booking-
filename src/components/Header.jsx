import React from "react";
import { NavLink, Link } from "react-router-dom";
import './Header.css'; // Retain this for other styles
import logo from "../assets/new_web.png"; // Import your logo

const Header = () => {
  return (
    <header className="p-3 mb-3 bottom header-container">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-between">
          
          {/* Logo and Website Name Section */}
          <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 link-body-emphasis text-decoration-none">
            <h1>
              <span className="quick-text">Quick</span>
              <span className="stay-text">Stay</span>
            </h1>
          </a>

          {/* Navigation Links */}
          <ul className="nav col-12 col-lg-auto mb-2 justify-content-center mb-md-0">
            <li>
              <NavLink to="/" className="nav-link px-3">Home</NavLink>
            </li>
            <li>
              <NavLink to="/about" className="nav-link px-3">AboutUs</NavLink>
            </li>
            <li>
              <NavLink to="/customers" className="nav-link px-3">Service</NavLink>
            </li>
            <li>
              <NavLink to="/hotel" className="nav-link px-3">Hotels</NavLink>
            </li>
          </ul>

          {/* Search and Login/Signup Buttons */}
          <div className="d-flex flex-wrap align-items-center justify-content-end">
            <div className="d-flex">
              {/* Apply font-weight using inline classes */}
              <Link to="/login" className="btn btn-outline me-2 fw-semibold">Login</Link>
              <Link to="/signup" className="btn btn-primary fw-semibold">Sign Up</Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
