import React from 'react';
import './Footer.css';

const Footer = ({ data, labels }) => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">{data.nombre} {data.apellido}</h3>
            <p className="footer-description">{labels.headline}</p>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-subtitle">{labels.quickLinks}</h4>
            <ul className="footer-links">
              <li><a href="#home">{labels.links.home}</a></li>
              <li><a href="#about">{labels.links.about}</a></li>
              <li><a href="#skills">{labels.links.skills}</a></li>
              <li><a href="#projects">{labels.links.projects}</a></li>
              <li><a href="#contact">{labels.links.contact}</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-subtitle">{labels.connect}</h4>
            <div className="footer-social">
              <a href={data.github} target="_blank" rel="noopener noreferrer" className="footer-social-link">
                <i className="fab fa-github"></i>
              </a>
              <a href={data.linkedin} target="_blank" rel="noopener noreferrer" className="footer-social-link">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href={`mailto:${data.mail}`} className="footer-social-link">
                <i className="fas fa-envelope"></i>
              </a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} {data.nombre} {data.apellido}. {labels.rights}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
