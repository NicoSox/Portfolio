import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/css/Header.css';
import useThemeStore from '../data/themeStore';

const Header = () => {
  const { theme, toggleTheme } = useThemeStore();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="navbar">
      <div className="logo-box">
        <img src="/assets/LOGO.png" alt="Logo" className="logo" />Soxkij Nicolás
      </div>

      <button className="hamburger-btn" onClick={toggleMenu}>
        <i className={`bi ${isOpen ? 'bi-x-lg' : 'bi-list'}`}></i>
      </button>

      <ul className={`navbar-links ${isOpen ? 'open' : ''}`}>
        <li><Link to="/" onClick={() => setIsOpen(false)}>Home</Link></li>
        <li><Link to="/AboutMe" onClick={() => setIsOpen(false)}>About Me</Link></li>
        <li><Link to="/Proyects" onClick={() => setIsOpen(false)}>My Projects</Link></li>
        <li><Link to="/Contact" onClick={() => setIsOpen(false)}>Contact</Link></li>
        <li>
          <button onClick={toggleTheme} className="theme-btn">
            <i className={`bi ${theme === 'dark' ? 'bi-sun' : 'bi-moon'}`}></i>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
