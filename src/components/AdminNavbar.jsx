
import React from 'react';
import UniplanerLogo from '../assets/uniplaner_logo.JPG'

function AdminNavbar(props) {
  return (

    <nav className="fixed-top navbar navbar-expand-lg navbar-dark navbar-custom py-3" style={{ backgroundColor: '#262262' }}>
      <div className="container-fluid px-3">
        <a className="navbar-brand ms-3" href="#">
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

        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="/">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/admin">Planen</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#Impressum">Impressum</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

  );
}

export default AdminNavbar;

