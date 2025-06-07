import '../../styles/css/MainHome.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom';

const Main = () => {


    return (
        <>
            <div className="main-scrollable">
                <section class="hero">
                    <div class="hero-content">
                        <h1>👋 ¡Hola! Soy <span class="highlight">Nicolás Soxkij</span></h1>
                        <p class="subtitle">Desarrollador Full Stack | Creativo | Apasionado por la tecnología</p>
                        <p class="description">
                            Creo aplicaciones web modernas, funcionales y enfocadas en la experiencia del usuario.
                            ¿Listo para ver lo que puedo hacer?
                        </p>
                        <div class="hero-buttons">
                            <Link to="/Proyects" className="hero-btn primary">🚀 Ver proyectos</Link>
                            <a href="https://wa.me/5491130991611?text=Hola,%20me%20interesa%20tu%20trabajo%20como%20desarrollador." target="_blank" rel="noopener noreferrer" className="hero-btn secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}><i className="bi bi-whatsapp" style={{ fontSize: '1.5rem' }}></i>Contactame</a>
                            <Link to="/AboutMe" className="hero-btn primary"><i className="bi bi-person" style={{ fontSize: '1.5rem' }}></i>Conoce quien soy</Link>
                        </div>
                    </div>
                    <div class="hero-image">
                        <img src="assets/img-code.png" alt="Imagen representativa" />
                    </div>
                </section>
            </div>
        </>
    )
}
export default Main;