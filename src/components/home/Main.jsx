import 'bootstrap-icons/font/bootstrap-icons.css';
// migrated to Tailwind utilities; using scroll buttons instead of Links
import { FiCode, FiPhone, FiUser } from 'react-icons/fi';

const Main = () => {
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="main-scrollable">
      <section className="hero-wrapper min-h-screen flex flex-col md:flex-row items-center justify-center gap-8 px-6 md:px-12 py-12">
        <div className="hero-content max-w-xl text-center md:text-left" data-aos="fade-up">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">👋 ¡Hola! Soy <span className="text-sky-500">Nicolás Soxkij</span></h1>
          <p className="text-lg text-slate-700 dark:text-slate-300 mb-4">Desarrollador Full Stack | Creativo | Apasionado por la tecnología</p>
          <p className="text-base text-slate-600 dark:text-slate-300 mb-6">Creo aplicaciones web modernas, funcionales y enfocadas en la experiencia del usuario. ¿Listo para ver lo que puedo hacer?</p>

          
        </div>

        <div className="hero-image w-full max-w-md" data-aos="fade-up">
          <img src="assets/img-code.png" alt="Imagen representativa" className="w-full h-auto rounded-xl shadow-2xl" />
        </div>
      </section>
    </div>
  )
}
export default Main;