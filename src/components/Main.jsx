import React from 'react';
import "../css/Main.css";
import "../css/Header.css"

function Main({alumno}) {
  const { nombre, edad, cursando, facultad, lenguajes } = alumno;
  return (
    <div className="card">
      <div className="card-content">
        <h2 className="card-title">Nombre: {nombre}</h2>
        <br />
        
        <h3> Mi edad: {edad} <hr /></h3>
        <h3>Que me encuentro cursando?: {cursando} <hr /></h3>
        <h3>En que Facultad?:{facultad} <hr /></h3>
        <h3>Que lenguajes de programacion conozco?:{lenguajes}</h3>
      </div>
    </div>
  );
}

export default Main;