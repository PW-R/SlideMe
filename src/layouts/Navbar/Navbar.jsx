// src/layouts/Navbar.jsx

import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css'; // Assuming you have a CSS file for styles

function Navbar({ tab, setTab }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">MyApp</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink
                to="/home"
                className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                onClick={() => setTab('home')}
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/list"
                className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                onClick={() => setTab('list')}
              >
                List
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/notification"
                className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                onClick={() => setTab('notification')}
              >
                Notification
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/user"
                className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                onClick={() => setTab('user')}
              >
                User
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
