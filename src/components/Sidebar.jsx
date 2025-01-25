import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom"; // Import Link
import { RxDashboard } from "react-icons/rx";
import { SlPeople } from "react-icons/sl";
import { LuHotel } from "react-icons/lu";
import { VscOpenPreview } from "react-icons/vsc";
import {  TbBrandBooking } from "react-icons/tb";
import { FiSettings } from "react-icons/fi";
import { MdLogout } from "react-icons/md";
import "./Sidebar.css"; // Import custom CSS for further styling

const Sidebar = ({ setActiveSection }) => {
  const handleLogout = () => {
    // Clear any user data from localStorage (or any other session storage)
    localStorage.removeItem("token"); // For example, removing the token

    // Navigate to the homepage ("/")
    window.location.href = "/"; // This will redirect to the home page
  };

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
            <Nav.Link
              onClick={() => setActiveSection("charts")}
              className="nav-link"
            >
              <RxDashboard /> Dashboard
            </Nav.Link>
            <Nav.Link
              onClick={() => setActiveSection("customer")}
              className="nav-link"
            >
              <SlPeople /> Customer Details
            </Nav.Link>
            <Nav.Link
              onClick={() => setActiveSection("hotel")}
              className="nav-link"
            >
              <LuHotel /> Hotel Details
            </Nav.Link>
            <Nav.Link
              onClick={() => setActiveSection("HotelTable")}
              className="nav-link"
            >
              <VscOpenPreview /> Hotel
            </Nav.Link>
            
            <Nav.Link
              onClick={() => setActiveSection("booking")}
              className="nav-link"
            >
              <TbBrandBooking /> Booking
            </Nav.Link>
          </Nav>
        </div>

        {/* Settings & Logout buttons */}
        <div className="settings-logout">
          <Nav className="flex-column mt-auto">
            <Nav.Link
              onClick={() => setActiveSection("settings")}
              className="nav-link"
            >
              <FiSettings /> Settings
            </Nav.Link>
            <Nav.Link onClick={handleLogout} className="nav-link">
              <MdLogout /> Logout
            </Nav.Link>
          </Nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
