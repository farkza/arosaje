// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Navbar.css';
import logo from '../img/arosaje.png';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-logo">
            <img src={logo} alt="Arosaje" />
        </Link>
        <ul className="navbar-menu">
          <li><Link to="/explorer">Explorer</Link></li>
          <li><Link to="/plantes">Plantes</Link></li>
          <li><Link to="/messagerie">Messagerie</Link></li>
          <li><Link to="/faq">FAQ</Link></li>
        </ul>
      </div>
      <div className="navbar-right">
        <span>Nom de l'utilisateur</span>
      </div>
    </nav>
  );
}

export default Navbar;
