import React, { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = ({ labels, onToggleLanguage, lang }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <a href="#home" className="navbar-logo" onClick={closeMobileMenu}>
          <span className="logo-text">NS</span>
        </a>
        
        <div className="navbar-actions">
          <button 
            className={`mobile-menu-btn ${isMobileMenuOpen ? 'active' : ''}`}
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <button 
            className="lang-toggle" 
            onClick={onToggleLanguage}
            aria-label={labels.toggleLabel}
          >
            <span className={lang === 'es' ? 'active' : ''}>ES</span>
            <span className={lang === 'en' ? 'active' : ''}>EN</span>
          </button>
        </div>

        <ul className={`navbar-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          <li><a href="#home" onClick={closeMobileMenu}>{labels.home}</a></li>
          <li><a href="#about" onClick={closeMobileMenu}>{labels.about}</a></li>
          <li><a href="#skills" onClick={closeMobileMenu}>{labels.skills}</a></li>
          <li><a href="#projects" onClick={closeMobileMenu}>{labels.projects}</a></li>
          <li><a href="#contact" onClick={closeMobileMenu}>{labels.contact}</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
