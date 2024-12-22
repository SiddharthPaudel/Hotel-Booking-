import React from "react";
import { NavLink,Link } from "react-router-dom";
import Home from "../pages/Home";

const Header = () => {
  return (
    <>
      <div className="container">
        <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
          <div className="col-md-3 mb-2 mb-md-0">
            <Link to="/" className="d-inline-flex link-body-emphasis text-decoration-none">
              <svg className="bi" width="40" height="32" role="img" aria-label="Bootstrap">
                <use xlinkHref="#bootstrap"></use>
              </svg>
            </Link>
          </div>

          <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
            <li>
              <Link to="/" className="nav-link px-2 link-secondary">
                Home
              </Link>
            </li>
            <li>
              <NavLink to="/hotels" className="nav-link px-2">
                Hotels
              </NavLink>
            </li>
            <li>
            <Link
              to="/service"
              smooth={true}
              duration={500}
              className="nav-link px-2"
            >
              Service
            </Link>
            </li>
            <li>
              <Link to="#about" className="nav-link px-2">
                AboutUs
              </Link>
            </li>
            {/* <li>
              <Link to="/a" className="nav-link px-2">
                About
              </Link>
            </li> */}
          </ul>

          <div className="col-md-3 text-end">
            <Link to="/login">
              <button type="button" className="btn btn-outline-primary me-2">
                Login
              </button>
            </Link>
            <Link to="/signup">
              <button type="button" className="btn btn-primary">
                Sign-up
              </button>
            </Link>
          </div>
        </header>
      </div>
    </>
  );
};

export default Header;
