import React, { useState } from 'react';
import '../../styles/css/MainProyects.css';
import data from '../../data/data.json';
import { useNavigate, Link } from 'react-router-dom';

const Main = () => {
  const [info] = useState(data[0]);
  const [expandedCards, setExpandedCards] = useState({});
  const [activeImage, setActiveImage] = useState(null);
  const navigate = useNavigate();

  const toggleExpand = (index) => {
    setExpandedCards((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const openImage = (src) => setActiveImage(src);
  const closeImage = () => setActiveImage(null);

  if (!info) return <p>Cargando información...</p>;

  return (
    <>
      <button onClick={() => navigate(-1)}style={{position: 'absolute',top: '70px',left: '10px',padding: '8px 12px',cursor: 'pointer',borderRadius: '5px',border: '1px solid #ccc',backgroundColor: '#fff',zIndex: 1100,}}>
        ← Volver
      </button>

      <div className="main-scrollable">
        <div className="card-main-proyects">
          {info.mis_proyectos.map((proyecto, index) => {
            const isExpanded = expandedCards[index];

            return (
              <div
                key={index}
                className={`card-main-proyects-item ${isExpanded ? 'expanded' : ''}`}
              >
                <div className="card-main-proyects-content">
                  <div className="card-main-proyects-img">
                    <img src={proyecto.imagen_proyecto}alt={proyecto.nombre}onClick={() => openImage(proyecto.imagen_proyecto)}style={{ cursor: 'pointer' }}/>
                  </div>

                  {isExpanded && (
                    <div className="card-main-proyects-info">
                      <h3>{proyecto.nombre}</h3>
                      <br />
                      <p>
                        <strong>Tecnologías: </strong> {proyecto.tecnologias}
                      </p>
                      <br />
                      <p>
                        <strong>Información: </strong>
                        {proyecto.descripcion}
                      </p>
                      <br />
                      <a href={proyecto.enlace}target="_blank"rel="noopener noreferrer"className="btn-ver-codigo">
                        Quiero ver el código
                      </a>
                    </div>
                  )}
                </div>

                <div className="card-arrow" onClick={() => toggleExpand(index)}>
                  {isExpanded ? '▲' : '▼'}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {activeImage && (
        <div className="modal-image" onClick={closeImage}>
          <img src={activeImage} alt="Imagen ampliada" />
        </div>
      )}
    </>
  );
};

export default Main;
