import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { SlPeople } from "react-icons/sl";
import { LuHotel } from "react-icons/lu";
import { VscOpenPreview } from "react-icons/vsc";
import { TbListDetails, TbBrandBooking } from "react-icons/tb";
import { FiSettings } from "react-icons/fi";
import { MdLogout } from "react-icons/md";
import "./Sidebar.css"; // Import custom CSS for further styling

const Sidebar = () => {
  return (
    <div className="sidebar-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="brand-container">
          <span className="brand-quick">Quick</span>
          <span className="brand-stay">Stay</span>
        </div>
        <div className="menu">
          <Nav className="flex-column">
            <Nav.Link as={Link} to="/dashboard" className="nav-link">
              <RxDashboard />   Dashboard
            </Nav.Link>
            <Nav.Link as={Link} to="/customer" className="nav-link">
              <SlPeople /> Customer
            </Nav.Link>
            <Nav.Link as={Link} to="/hotel-details" className="nav-link">
              <LuHotel /> Hotel Details
            </Nav.Link>
            <Nav.Link as={Link} to="/reviews" className="nav-link">
              <VscOpenPreview /> Reviews
            </Nav.Link>
            <Nav.Link as={Link} to="/customer-details" className="nav-link">
              <TbListDetails /> Customer Details
            </Nav.Link>
            <Nav.Link as={Link} to="/calendar" className="nav-link">
              <TbBrandBooking /> Booking
            </Nav.Link>
          </Nav>
        </div>

        {/* Settings & Logout buttons */}
        <div className="settings-logout">
          <Nav className="flex-column mt-auto">
            <Nav.Link as={Link} to="/settings" className="nav-link">
              <FiSettings /> Settings
            </Nav.Link>
            <Nav.Link as={Link} to="/logout" className="nav-link">
              <MdLogout /> Logout
            </Nav.Link>
          </Nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
