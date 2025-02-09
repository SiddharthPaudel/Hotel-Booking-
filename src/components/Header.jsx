import { useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import ProfileModal from "../ProfileModal/ProfileModal";
import BookingModal from "../BookingModal/BookingModal";  // Import the modal for showing bookings
import "./Header.css";
import profile from "../assets/user.png";
import Logout from "../assets/logout.png";
import bookingIcon from "../assets/book_here.png"; // Add your booking icon image

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false); // Profile modal
  const [showBookingModal, setShowBookingModal] = useState(false); // Booking modal

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleBookingClick = () => {
    setShowBookingModal(true); // Show booking modal
  };

  return (
    <>
      <header className="p-3 mb-3 bottom header-container">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-between">
            {/* Brand Name */}
            <a
              href="/"
              className="d-flex align-items-center mb-2 mb-lg-0 link-body-emphasis text-decoration-none"
            >
              <h1>
                <span className="quick-text">Quick</span>
                <span className="stay-text">Stay</span>
              </h1>
            </a>

            {/* Navigation Links */}
            <ul className="nav col-12 col-lg-auto mb-2 justify-content-center mb-md-0">
              <li>
                <Link
                  to="/"
                  smooth={true}
                  duration={500}
                  className="nav-link px-3"
                >
                  Home
                </Link>
              </li>
              <li>
                <ScrollLink
                  to="about"
                  smooth={true}
                  duration={500}
                  className="nav-link px-3"
                >
                  About Us
                </ScrollLink>
              </li>
              <li>
                <ScrollLink
                  to="service"
                  smooth={true}
                  duration={500}
                  className="nav-link px-3"
                >
                  Service
                </ScrollLink>
              </li>
              <li>
                <ScrollLink
                  to="ContactUs"
                  smooth={true}
                  duration={100}
                  className="nav-link px-3"
                >
                  ContactUs
                </ScrollLink>
              </li>
              <li>
                <Link to="/hotel" className="nav-link px-3">
                  Hotels
                </Link>
              </li>
            </ul>

            {/* User Profile & Booking Icon Section */}
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
                      src={profile}
                      alt="Profile"
                      className="img-fluid rounded-circle"
                      style={{ width: "30px", height: "30px" }}
                    />
                  </button>
                  <ul
                    className="dropdown-menu dropdown-menu-end shadow-lg p-3 rounded-3"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <li>
                      <button
                        className="dropdown-item d-flex align-items-center"
                        onClick={() => setShowModal(true)}
                      >
                        <img
                          src={profile}
                          alt="Profile"
                          className="me-2"
                          style={{
                            width: "20px",
                            height: "20px",
                            objectFit: "contain",
                          }}
                        />
                        <small>{user.username}</small>
                      </button>
                    </li>

                    <li>
                      <a className="dropdown-item text-muted">
                        <small>{user.email}</small>
                      </a>
                    </li>

                    <li>
                      <hr className="dropdown-divider" />
                    </li>

                    <li>
                      <button
                        className="dropdown-item d-flex align-items-center"
                        onClick={handleLogout}
                      >
                        <img
                          src={Logout}
                          alt="Logout"
                          className="me-2"
                          style={{
                            width: "20px",
                            height: "20px",
                            objectFit: "contain",
                          }}
                        />
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              ) : (
                <div className="d-flex flex-nowrap align-items-center">
                  <Link
                    to="/login"
                    className="btn btn-outline me-2 fw-semibold"
                  >
                    Login
                  </Link>
                  <Link to="/signup" className="btn btn-primary semibold">
                    SignUp
                  </Link>
                </div>
              )}

              {/* Booking Icon - Visible if user is logged in */}
              {user && (
                <button
                  className="btn p-0 ms-3"
                  onClick={handleBookingClick}
                  aria-label="View Bookings"
                >
                  <img
                    src={bookingIcon}
                    alt="Bookings"
                    style={{ width: "30px", height: "30px" }}
                  />
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Profile Modal */}
      <ProfileModal showModal={showModal} onClose={() => setShowModal(false)} />
      
      {/* Booking Modal */}
      <BookingModal
        showModal={showBookingModal}
        onClose={() => setShowBookingModal(false)}
      />
    </>
  );
};

export default Header;
