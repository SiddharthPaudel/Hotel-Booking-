import { useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import ProfileModal from "../ProfileModal/ProfileModal"; // Import the new ProfileModal component
import "./Header.css";
import profile from "../assets/user.png";
import Logout from "../assets/logout.png";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false); // Manage modal visibility

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <header className="p-3 mb-3 bottom header-container">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-between">
            <a
              href="/"
              className="d-flex align-items-center mb-2 mb-lg-0 link-body-emphasis text-decoration-none"
            >
              <h1>
                <span className="quick-text">Quick</span>
                <span className="stay-text">Stay</span>
              </h1>
            </a>

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
                <Link to="/hotel" className="nav-link px-3">
                  Hotels
                </Link>
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
                    {/* Profile Option with an Icon */}
                    <li>
                      <button
                        className="dropdown-item d-flex align-items-center"
                        onClick={() => setShowModal(true)}
                      >
                         <img
                          src={profile}// Replace with actual image URL
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

                    {/* Username Display */}
                    <li>
                      <a className="dropdown-item text-muted">
                        <small>{user.email}</small>
                      </a>
                    </li>

                    <li>
                      <hr className="dropdown-divider" />
                    </li>

                    {/* Logout Option with External Image */}
                    <li>
                      <button
                        className="dropdown-item d-flex align-items-center"
                        onClick={handleLogout}
                      >
                        <img
                          src={Logout}// Replace with actual image URL
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
            </div>
          </div>
        </div>
      </header>

      {/* Pass props to ProfileModal */}
      <ProfileModal showModal={showModal} onClose={() => setShowModal(false)} />
    </>
  );
};

export default Header;
