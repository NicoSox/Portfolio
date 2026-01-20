import React from 'react';
import './Hero.css';

const Hero = ({ data, labels, cvLink }) => {

  return (
    <section className="hero" id="home">
      <div className="hero-background"></div>
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">
            {labels.greeting} <span className="highlight">{data.nombre} {data.apellido}</span>
          </h1>
          <h2 className="hero-subtitle">{labels.subtitle}</h2>
          <p className="hero-description">{labels.description}</p>
          <div className="hero-cta">
            <a href="#projects" className="btn btn-primary">{labels.ctaProjects}</a>
            <a href="#contact" className="btn btn-secondary">{labels.ctaContact}</a>
            <a href={cvLink} className="btn btn-secondary" download>
              {labels.cv}
            </a>
          </div>
          <div className="hero-social">
            <a href={data.github} target="_blank" rel="noopener noreferrer" className="social-link">
              <i className="fab fa-github"></i>
            </a>
            <a href={data.linkedin} target="_blank" rel="noopener noreferrer" className="social-link">
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </div>
        <div className="hero-image">
          <div className="image-wrapper">
            <img src={data.imagen} alt={`${data.nombre} ${data.apellido}`} />
            <div className="image-glow"></div>
          </div>
        </div>
      </div>
      <div className="scroll-indicator">
        <a href="#about" className="scroll-down">
          <span></span>
          <span></span>
          <span></span>
        </a>
      </div>
    </section>
  );
};

export default Hero;
