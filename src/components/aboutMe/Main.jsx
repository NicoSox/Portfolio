import React, { useState, useEffect } from 'react';
import data from '../../data/data.json'; // ajusta la ruta según tu estructura
import '../../styles/css/MainAbout.css';

const Main = () => {
  const [info, setInfo] = useState(null);

  useEffect(() => {
    if (data && data.length > 0) {
      setInfo(data[0]);  // Asumiendo que tu JSON es un array y quieres el primer objeto
    }
  }, []);

  if (!info) return <p>Cargando información...</p>;

  return (

    <div className="main-scrollable">
    <div className="about-container">
      <h1>About Me</h1>
      <div className="profile-card">
        <img src={info.imagen} alt={`${info.nombre} ${info.apellido}`} className="profile-image" />
        <div className="profile-info">
          <h2>{info.nombre} {info.segundo_nombre} {info.apellido}</h2>
          <p><strong>Edad:</strong> {info.edad}</p>
          <p><strong>Facultad:</strong> {info.facultad}</p>
          <p><strong>Carrera actual:</strong> {info.carrera}</p>
          <p><strong>Próxima carrera:</strong> {info.proxima_carrera}</p>
          <p><strong>Email:</strong> <a href={`mailto:${info.mail}`}>{info.mail}</a></p>
          <p><strong>Teléfono:</strong> <a href={`tel:${info.telefono}`}>{info.telefono}</a></p>
          <p>
            <strong>Redes:</strong>{' '}
            <a href={info.github} target="_blank" rel="noopener noreferrer">GitHub</a> |{' '}
            <a href={info.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </p>
          <div>
            <strong>Lenguajes y tecnologías:</strong>
            <ul className="tech-list">
              {info.lenguajes.map((tech, i) => (
                <li key={i}>{tech}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Main;
