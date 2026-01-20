import React, { useState } from 'react';
import './Projects.css';

const Projects = ({ data, labels, lang }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  // Track a single expanded card so only one description is open at a time
  const [expandedIndex, setExpandedIndex] = useState(null);

  // Map of assets in src/assets to URLs
  const assetMap = import.meta.glob('../assets/*', { eager: true, as: 'url' });

  const resolveAsset = (path) => {
    if (!path) return path;
    // If path starts with '/', assume public folder (served as-is)
    if (path.startsWith('/')) return path;
    const key = `../assets/${path}`;
    return assetMap[key] || path;
  };

  const openGallery = (project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
  };

  const closeGallery = () => {
    setSelectedProject(null);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) => 
        prev === selectedProject.galeria.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedProject.galeria.length - 1 : prev - 1
      );
    }
  };

  const toggleDescription = (index) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="projects" id="projects">
      <div className="projects-container">
        <div className="section-header">
          <h2 className="section-title">{labels.title}</h2>
          <div className="title-underline"></div>
          <p className="section-subtitle">{labels.subtitle}</p>
        </div>
        <div className="projects-grid">
          {data.mis_proyectos.map((project, index) => {
            const isExpanded = expandedIndex === index;
            return (
            <div 
              key={index} 
              className="project-card"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="project-image-container">
                <img 
                  src={resolveAsset(project.imagen_proyecto)} 
                  alt={project.nombre}
                  className="project-image"
                />
                <div className="project-overlay">
                  {project.tipo === 'publico' ? (
                    <a 
                      href={project.enlace} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="project-link"
                    >
                      <i className="fab fa-github"></i>
                      {labels.viewCode}
                    </a>
                  ) : (
                    <button 
                      onClick={() => openGallery(project)}
                      className="project-link"
                    >
                      <i className="fas fa-images"></i>
                      {labels.viewGallery || 'Ver Galería'}
                    </button>
                  )}
                </div>
              </div>
              <div className="project-content">
                <h3 className="project-title">{project.nombre}</h3>
                <div className="project-tech">
                  {project.tecnologias.split(',').map((tech, idx) => (
                    <span key={idx} className="tech-tag">{tech.trim()}</span>
                  ))}
                </div>
                <div className="project-description-wrapper">
                  <p className={`project-description ${isExpanded ? 'expanded' : ''}`}>
                    {isExpanded ? labels.descriptions[index] : `${labels.descriptions[index].slice(0, 150)}...`}{' '}
                    {!isExpanded && (
                      <span 
                        className="toggle-description-btn inline"
                        onClick={() => toggleDescription(index)}
                      >
                        {lang === 'es' ? 'ver más' : 'read more'}
                      </span>
                    )}
                  </p>
                </div>
                {isExpanded && (
                  <button 
                    className="toggle-description-btn"
                    onClick={() => toggleDescription(index)}
                  >
                    {lang === 'es' ? 'Ver menos' : 'Show less'}
                    <i className="fas fa-chevron-up"></i>
                  </button>
                )}
                {project.tipo === 'publico' ? (
                  <a 
                    href={project.enlace} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="project-btn"
                  >
                    {labels.viewRepo}
                    <i className="fas fa-arrow-right"></i>
                  </a>
                ) : (
                  <button 
                    onClick={() => openGallery(project)}
                    className="project-btn"
                  >
                    {labels.viewGallery || 'Ver Galería'}
                    <i className="fas fa-images"></i>
                  </button>
                )}
              </div>
            </div>
            );
          })}
        </div>
      </div>

      {selectedProject && (
        <div className="gallery-modal" onClick={closeGallery}>
          <div className="gallery-content" onClick={(e) => e.stopPropagation()}>
            <button className="gallery-close" onClick={closeGallery}>
              <i className="fas fa-times"></i>
            </button>
            <div className="gallery-image-container">
              {selectedProject.galeria.length > 1 && (
                <button className="gallery-nav prev" onClick={prevImage}>
                  <i className="fas fa-chevron-left"></i>
                </button>
              )}
              <img 
                src={resolveAsset(selectedProject.galeria[currentImageIndex])} 
                alt={`${selectedProject.nombre} - ${currentImageIndex + 1}`}
                className="gallery-image"
              />
              {selectedProject.galeria.length > 1 && (
                <button className="gallery-nav next" onClick={nextImage}>
                  <i className="fas fa-chevron-right"></i>
                </button>
              )}
            </div>
            <div className="gallery-info">
              <h3>{selectedProject.nombre}</h3>
              {selectedProject.galeria.length > 1 && (
                <p className="gallery-counter">
                  {currentImageIndex + 1} / {selectedProject.galeria.length}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
