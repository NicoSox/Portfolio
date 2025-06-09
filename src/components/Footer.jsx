import React, { useState } from 'react';
import { FaGithub, FaLinkedin, FaWhatsapp, FaEnvelope } from 'react-icons/fa';
import '../styles/css/Footer.css'; 

const Footer = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="footer-container">
      <div className="footer-toggle"onClick={() => setOpen(!open)}onKeyDown={(e) => { if (e.key === 'Enter') setOpen(!open) }}role="button"tabIndex={0}aria-expanded={open}aria-controls="social-links">
        {open ? 'Cerrar redes sociales ✕' : 'Mostrar redes sociales ▼'}
      </div>

      {open && (
        <div id="social-links" className="footer-social-links">
          <a href="https://github.com/NicoSox"target="_blank"rel="noopener noreferrer"aria-label="GitHub"className="social-icon">
            <FaGithub size={28} />
          </a>

          <a href="https://www.linkedin.com/in/nicolas-soxkij/"target="_blank"rel="noopener noreferrer"aria-label="LinkedIn"className="social-icon">
            <FaLinkedin size={28} />
          </a>

          <a href="https://wa.me/5491130991611"target="_blank"rel="noopener noreferrer"aria-label="WhatsApp"className="social-icon">
            <FaWhatsapp size={28} />
          </a>

          <a href="mailto:nicosoxkij@gmail.com"aria-label="Email"className="social-icon">
            <FaEnvelope size={28} />
          </a>
        </div>
      )}
    </div>
  );
};

export default Footer;
