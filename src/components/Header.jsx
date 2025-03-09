import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported

function Header() {
  return (
    <nav className="fixed-top navbar navbar-expand-lg navbar-dark navbar-custom py-3" style={{ backgroundColor: '#262262' }}>
      <div className="container">
        <a className="navbar-brand" href="#">
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

export default Header;
