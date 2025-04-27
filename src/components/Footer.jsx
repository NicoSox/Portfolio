import React from 'react'
import "../css/Footer.css"
import "../css/SeparadorVertical.css"

function Footer  () {
    return (
        <div className="footer">
           <a href="https://www.linkedin.com/in/nicolas-soxkij" target="_blank" rel="noopener noreferrer">
               Mi Linkedin
           </a>
           <hr className='separador2' />
           <a href="https://github.com/NicoSox" target="_blank" rel="noopener noreferrer">Mi GitHub</a>
        </div>
    )
}
export default Footer