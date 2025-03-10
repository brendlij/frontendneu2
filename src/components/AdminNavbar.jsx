import React from "react";
import UniplanerLogo from "../assets/offenes-buch.png";

function AdminNavbar(props) {
  return (
    <nav
      className="fixed-top navbar navbar-expand-lg navbar-dark navbar-custom py-3"
      style={{ backgroundColor: "#262262" }}
    >
      <div className="container-fluid px-3">
        <a className="navbar-brand d-flex align-items-center ms-3" href="#">
          <img
            src={UniplanerLogo}
            alt="Uniplaner Logo"
            style={{ height: "40px", marginRight: "10px" }}
          />
          Dream Planer
        </a>

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
              <a className="nav-link d-flex align-items-center" href="/">
                <i className="bi bi-house-door-fill me-1"></i>
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link d-flex align-items-center" href="/admin">
                <i className="bi bi-gear-fill me-1"></i>
                Organize
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link d-flex align-items-center"
                href="/admin/lecturer-dashboard"
              >
                <i className="bi bi-person-fill me-1"></i>
                Dashboard
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default AdminNavbar;
