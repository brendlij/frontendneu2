import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is imported
import Logo from "../assets/offenes-buch.png"; // Pfad zum Logo

function Header() {
  return (
    <nav
      className="fixed-top navbar navbar-expand-lg navbar-dark navbar-custom py-3"
      style={{ backgroundColor: "#262262" }}
    >
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img
            src={Logo}
            alt="Logo"
            style={{ height: "40px", marginRight: "10px" }}
          />
          Dream University
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link d-flex align-items-center" to="/">
                <i className="bi bi-house-door-fill me-1"></i>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link d-flex align-items-center" to="/admin">
                <i className="bi bi-gear-fill me-1"></i>
                Organize
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link d-flex align-items-center" to="/about">
                <i className="bi bi-info-circle-fill me-1"></i>
                About
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
