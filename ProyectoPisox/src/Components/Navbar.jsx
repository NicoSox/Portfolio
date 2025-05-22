import  '../Style/css/NavbarStyle.css'
import {Link} from 'react-router-dom'
import LOGO from '../assets/LOGO.png'


const Navbar =()=>{
    return (
        <>
  <nav>
  <div className="nav-left">
    <img src={LOGO} alt="Logo" className="nav-logo" />
    <span className="nav-text">Pisox</span>
  </div>
  <div className="nav-right">
    <Link to="/Home">Home</Link>
    <Link to="/Profile">Mi perfil</Link>
    <Link to="/">Cerrar Sesion</Link>
  </div>
</nav>

        </>
    )
}
export default Navbar;