import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../css/Navbar.css';
import logo from '../img/arosaje.png';
import searchIcon from '../img/search.svg';
import profileIcon from '../img/profile.svg';

function Navbar({ isLoggedIn, handleLogout }) {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;

      if (scrollTop > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-left">
        <img src={logo} alt="Arosaje Logo" className="logo" />
        <h1 className={`brand ${scrolled ? 'white-text' : ''}`}>Arosaje</h1>
      </div>
      <div className="navbar-center">
        <ul className="menu">
          <li><Link to="/explorer" className={location.pathname === "/explorer" && isLoggedIn ? "selected" : ""}>Explorer</Link></li>
          <li><Link to="/plantes" className={location.pathname === "/plantes" ? "selected" : ""}>Plantes</Link></li>
          <li><Link to="/messagerie" className={location.pathname === "/messagerie" ? "selected" : ""}>Messagerie</Link></li>
          <li><Link to="/faq" className={location.pathname === "/faq" ? "selected" : ""}>FAQ</Link></li>
        </ul>
      </div>
      <div className={`navbar-right ${scrolled ? 'white-text' : ''}`}>
        <img src={searchIcon} alt="Search Icon" className={`icon ${scrolled ? 'white-icon' : ''}`} />
        <img src={profileIcon} alt="Profile Icon" className={`icon ${scrolled ? 'white-icon' : ''}`} />
        {isLoggedIn && <button className={`brand ${scrolled ? 'white-text' : ''}`} onClick={handleLogout}>Déconnexion</button>}
      </div>
    </nav>
  );
}

export default Navbar;
