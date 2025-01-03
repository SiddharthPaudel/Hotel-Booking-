import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaHome, FaUser, FaHotel, FaStar, FaCalendarAlt, FaCog, FaSignOutAlt } from 'react-icons/fa'; // Importing icons
import 'bootstrap/dist/css/bootstrap.min.css';
import './Sidebar.css'; // Import custom CSS for further styling

const Sidebar = () => {
  return (
    <div className="sidebar-container">
      {/* Sidebar */}
      <div className="sidebar">
        <Navbar.Brand href="#" className="text-dark">Quick Stay</Navbar.Brand>
        <div className="menu">
          <Nav className="flex-column">
            <Nav.Link as={Link} to="/dashboard" className="nav-link">
              <FaHome /> Dashboard
            </Nav.Link>
            <Nav.Link as={Link} to="/customer" className="nav-link">
              <FaUser /> Customer
            </Nav.Link>
            <Nav.Link as={Link} to="/hotel-details" className="nav-link">
              <FaHotel /> Hotel Details
            </Nav.Link>
            <Nav.Link as={Link} to="/reviews" className="nav-link">
              <FaStar /> Reviews
            </Nav.Link>
            <Nav.Link as={Link} to="/customer-details" className="nav-link">
              <FaUser /> Customer Details
            </Nav.Link>
            <Nav.Link as={Link} to="/calendar" className="nav-link">
              <FaCalendarAlt /> Calendar
            </Nav.Link>
          </Nav>
        </div>

        {/* Settings & Logout buttons */}
        <div className="settings-logout">
          <Nav className="flex-column mt-auto">
            <Nav.Link as={Link} to="/settings" className="nav-link">
              <FaCog /> Settings
            </Nav.Link>
            <Nav.Link as={Link} to="/logout" className="nav-link">
              <FaSignOutAlt /> Logout
            </Nav.Link>
          </Nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
