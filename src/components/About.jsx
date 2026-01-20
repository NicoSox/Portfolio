import React from 'react';
import './About.css';

const About = ({ data, labels, lang }) => {
  return (
    <section className="about" id="about">
      <div className="about-container">
        <div className="section-header">
          <h2 className="section-title">{labels.title}</h2>
          <div className="title-underline"></div>
        </div>
        <div className="about-content">
          <div className="about-info">
            <p className="about-text">
              {labels.paragraph1} {lang === 'es' ? data.carrera : data.carrera_en} {labels.fields.at} {lang === 'es' ? data.facultad : data.facultad_en}{labels.paragraph2} {lang === 'es' ? data.proxima_carrera : data.proxima_carrera_en}.
            </p>
            <p className="about-text">
              {labels.paragraph3}
            </p>
            <div className="about-details">
              <div className="detail-item">
                <i className="fas fa-user"></i>
                <div>
                  <strong>{labels.fields.name}:</strong>
                  <span>{data.nombre} {data.segundo_nombre} {data.apellido}</span>
                </div>
              </div>
              <div className="detail-item">
                <i className="fas fa-birthday-cake"></i>
                <div>
                  <strong>{labels.fields.age}:</strong>
                  <span>{data.edad} {labels.fields.years}</span>
                </div>
              </div>
              <div className="detail-item">
                <i className="fas fa-envelope"></i>
                <div>
                  <strong>{labels.fields.email}:</strong>
                  <span>{data.mail}</span>
                </div>
              </div>
              <div className="detail-item">
                <i className="fas fa-phone"></i>
                <div>
                  <strong>{labels.fields.phone}:</strong>
                  <span>{data.telefono}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="about-skills">
            <h3 className="skills-title">{labels.extrasTitle}</h3>
            <div className="knowledge-list">
              {labels.knowledge.map((conocimiento, index) => (
                <div key={index} className="knowledge-item">
                  <i className="fas fa-check-circle"></i>
                  <span>{conocimiento}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
