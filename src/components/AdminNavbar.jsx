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
          Uniplaner
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
              <a className="nav-link" href="/">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/admin">
                Planen
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#Impressum">
                Impressum
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default AdminNavbar;
