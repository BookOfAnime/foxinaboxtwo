import React, { useState } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <span className="navbar-logo">Fox In A Box</span>
        <div className="navbar-menu-icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          ☰
        </div>
        <ul className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
          <li><a href="#home">Pump.Fun</a></li>
          <li><a href="#gallery">Gallery</a></li>
          <li><a href="#tokenomics">Tokenomics</a></li>
          <li><a href="#game">Game</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;