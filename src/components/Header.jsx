import React from 'react'
import "../css/Header.css"
function Header ({alumno}) {
    const { nombre } = alumno;
    return(
        <div className="header">
            <h1>PortFolio </h1>
            <hr className='separador1'/>
            <h1 className='nombre'> Este es el portafolio de: {nombre}</h1>
        </div>
    )
}
export default Header