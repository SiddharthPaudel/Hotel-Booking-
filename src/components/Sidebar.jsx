import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom"; // Import Link
import "./Sidebar.css"; // Import custom CSS for further styling
import dash from "../assets/dash.png";
import Logout from "../assets/logout.png";
import book from "../assets/booking.png";
import hotel from "../assets/resort.png";
import customer from "../assets/customer_details.png";
import stay from "../assets/stay.png"

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
            <Nav.Link onClick={() => setActiveSection("charts")} className="nav-link">
              <img
                src={dash}
                alt="Dashboard"
                style={{
                  width: "24px", // Adjust the width to match typical icon size
                  height: "24px", // Adjust the height as well
                  objectFit: "contain",
                  marginRight: "10px", // Optional: Space between image and text
                }}
              /> Dashboard
            </Nav.Link>
            <Nav.Link onClick={() => setActiveSection("customer")} className="nav-link">
              <img
                src={customer}
                alt="Customer Details"
                style={{
                  width: "24px",
                  height: "24px",
                  objectFit: "contain",
                  marginRight: "10px",
                }}
              /> Customer Details
            </Nav.Link>
            <Nav.Link onClick={() => setActiveSection("hotel")} className="nav-link">
              <img
                src={hotel}
                alt="Hotel Details"
                style={{
                  width: "24px",
                  height: "24px",
                  objectFit: "contain",
                  marginRight: "10px",
                }}
              /> Hotel Details
            </Nav.Link>
            <Nav.Link onClick={() => setActiveSection("HotelTable")} className="nav-link">
              <img
                src={stay}
                alt="Hotel"
                style={{
                  width: "24px",
                  height: "24px",
                  objectFit: "contain",
                  marginRight: "10px",
                }}
              /> Hotel
            </Nav.Link>
            <Nav.Link onClick={() => setActiveSection("booking")} className="nav-link">
              <img
                src={book}
                alt="Booking"
                style={{
                  width: "24px",
                  height: "24px",
                  objectFit: "contain",
                  marginRight: "10px",
                }}
              /> Booking
            </Nav.Link>
          </Nav>
        </div>

        {/* Settings & Logout buttons */}
        <div className="settings-logout">
          <Nav className="flex-column mt-auto">
            <Nav.Link onClick={handleLogout} className="nav-link">
              <img
                src={Logout}
                alt="Logout"
                style={{
                  width: "24px",
                  height: "24px",
                  objectFit: "contain",
                  marginRight: "10px",
                }}
              /> Logout
            </Nav.Link>
          </Nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
