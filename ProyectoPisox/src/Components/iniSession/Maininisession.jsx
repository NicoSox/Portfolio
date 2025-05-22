 import '../../Style/Css/Maininisession.css';
  import LOGO from '../../assets/LOGO.png';
  import {useState} from 'react'
  import {useEffect} from 'react'
  import {Link, useNavigate} from 'react-router-dom'
  

const Maininisession =()=>{

  const navigate = useNavigate();
  const [user, setUser] = useState({});

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Aquí podrías validar credenciales o hacer un fetch...

    e.target.reset();

    // Redirigir al home
    navigate('/Home');
  };

    return(
        <>
    <div className="card">
      <img src={LOGO} alt="Logo" className="logo-img"/>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email o Usuario</label>
          <input type="email"className="form-control"id="email"placeholder="ejemplo@correo.com O usuario" onChange={handleChange} required="Ingrese"/>
          
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Contraseña</label>

          <input type="password"className="form-control"id="password"placeholder="Tu contraseña" onChange={handleChange} required/>

          <div id="emailHelp" className="form-text">
            Nunca compartiremos tus datos con nadie.
          </div>

        </div>
        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="recordarme" />
          <label className="form-check-label" htmlFor="recordarme">
            Recordarme al cerrar sesión
          </label>
        </div>

        <button type="submit" className="btn btn-primary">Iniciar sesión</button>
      </form>
    </div>
        </>
    )
}
export default Maininisession