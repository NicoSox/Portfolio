import React, { useMemo, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import data from './data.json'
import './App.css'

const translations = {
  es: {
    navbar: {
      home: 'Inicio',
      about: 'Sobre Mí',
      skills: 'Habilidades',
      projects: 'Proyectos',
      contact: 'Contacto',
      toggleLabel: 'Cambiar idioma'
    },
    hero: {
      greeting: 'Hola, soy',
      subtitle: 'Desarrollador Full Stack',
      description: 'Estudiante y creador de experiencias web modernas y funcionales.',
      ctaProjects: 'Ver Proyectos',
      ctaContact: 'Contactar',
      cv: 'Descargar CV'
    },
    about: {
      title: 'Sobre Mí',
      paragraph1: 'Soy un desarrollador apasionado por la tecnología y la creación de soluciones innovadoras. Termine en diciembre de 2025',
      paragraph2: ', actualmente me encuentro estudiando ',
      paragraph3: 'Me especializo en desarrollo full stack con tecnologías modernas como React, Node.js y bases de datos SQL.',
      fields: {
        name: 'Nombre',
        age: 'Edad',
        email: 'Email',
        phone: 'Teléfono',
        years: 'años',
        at: 'en'
      },
      extrasTitle: 'Conocimientos Adicionales',
      knowledge: [
        'Gestión de desarrollo de software',
        'Metodologías ágiles (SCRUM)',
        'Análisis de datos'
      ]
    },
    skills: {
      title: 'Tecnologías & Habilidades',
      subtitle: 'Herramientas y tecnologías con las que trabajo'
    },
    projects: {
      title: 'Mis Proyectos',
      subtitle: 'Algunos de los proyectos en los que he trabajado',
      viewCode: 'Ver Código',
      viewRepo: 'Ver Repositorio',
      viewGallery: 'Ver Galería',
      descriptions: [
        'Aplicacion web y movil, que dará la vista a los clientes de los trabajos realizados por la empresa en su hogar y a los técnicos les permitira acceder a ciertos datos del cliente, como direccion, que tipo de trabajo hay que hacer, horario del turno solicitado por el cliente y etc. En resumen, Pisox sera una app de gestion de clientes con una vista para el cliente y otra para los tecnicos.',
        'Herramienta que permite a los tecnicos de Pisox realizar presupuestos de trabajos a realizar en el hogar del cliente. El presupuesto se genera a partir de un formulario que el tecnico completa con los datos del cliente, tipo de trabajo, materiales necesarios y otros detalles. Una vez completado, el presupuesto se guarda en la base de datos y se puede enviar al cliente por correo electrónico o descargarlo en pdf o imagen para su posterior envio.',
        "Diario digital completo 'La Reconquista'. Plataforma web integral que incluye chat interno en tiempo real para comunicación entre redactores y editores, sistema de notificaciones inteligente, organización por secciones temáticas, creación y gestión completa de noticias con múltiples estados de publicación. Incluye un innovador editor de contenido propio que permite formatear texto enriquecido, insertar imágenes, videos y contenido multimedia, gestionar borradores y programar publicaciones. Facilita el trabajo colaborativo con sistema de roles de usuario, control de versiones y flujo de aprobación de contenidos antes de su publicación.",
        'Proyecto colaborativo desarrollado en la facultad con el objetivo de replicar la plataforma Netflix y todas sus funcionalidades principales. Incluye sistema de autenticación de usuarios, catálogo de películas y series, búsqueda y filtrado de contenido, reproducción de videos, perfiles de usuario, listas personalizadas y sistema de recomendaciones. Implementado con tecnologías modernas y consumo de APIs REST para gestionar el contenido multimedia.'
      ]
    },
    contact: {
      title: 'Contacto',
      subtitle: '¿Tienes un proyecto en mente? ¡Hablemos!',
      successMessage: '✅ ¡Mensaje enviado exitosamente! Gracias por contactarme.',
      cards: {
        email: 'Email',
        phone: 'Teléfono',
        github: 'GitHub',
        linkedin: 'LinkedIn',
        viewProfile: 'Ver perfil',
        connect: 'Conectar'
      },
      form: {
        name: 'Nombre',
        email: 'Email',
        subject: 'Asunto',
        message: 'Mensaje',
        placeholderName: 'Tu nombre',
        placeholderEmail: 'tu@email.com',
        placeholderSubject: 'Asunto del mensaje',
        placeholderMessage: 'Tu mensaje...',
        submit: 'Enviar Mensaje',
        send: 'Enviar Mensaje',
        mailBodyLabels: {
          name: 'Nombre',
          email: 'Email',
          message: 'Mensaje'
        }
      }
    },
    footer: {
      headline: 'Desarrollador Full Stack apasionado por crear soluciones innovadoras y experiencias web excepcionales.',
      quickLinks: 'Enlaces Rápidos',
      connect: 'Conecta Conmigo',
      rights: 'Todos los derechos reservados.',
      links: {
        home: 'Inicio',
        about: 'Sobre Mí',
        skills: 'Habilidades',
        projects: 'Proyectos',
        contact: 'Contacto'
      }
    }
  },
  en: {
    navbar: {
      home: 'Home',
      about: 'About',
      skills: 'Skills',
      projects: 'Projects',
      contact: 'Contact',
      toggleLabel: 'Switch language'
    },
    hero: {
      greeting: "Hi, I'm",
      subtitle: 'Full Stack Developer',
      description: 'Student and builder of modern, high-quality web experiences.',
      ctaProjects: 'View Projects',
      ctaContact: 'Get in Touch',
      cv: 'Download CV'
    },
    about: {
      title: 'About Me',
      paragraph1: 'I am a developer passionate about technology and creating innovative solutions. I am currently studying',
      paragraph2: ', and I plan to continue with',
      paragraph3: 'I focus on full-stack development with modern technologies like React, Node.js, and SQL databases.',
      fields: {
        name: 'Name',
        age: 'Age',
        email: 'Email',
        phone: 'Phone',
        years: 'years',
        at: 'at'
      },
      extrasTitle: 'Additional Knowledge',
      knowledge: [
        'Software development management',
        'Agile methodologies (SCRUM)',
        'Data analysis'
      ]
    },
    skills: {
      title: 'Technologies & Skills',
      subtitle: 'Tools and technologies I work with'
    },
    projects: {
      title: 'My Projects',
      subtitle: 'Some of the projects I have worked on',
      viewCode: 'View Code',
      viewRepo: 'View Repository',
      viewGallery: 'View Gallery',
      descriptions: [
        'Web application that will provide clients with a view of the work carried out by the company in their home and will allow technicians to access certain client data, such as address, what type of work needs to be done, the time of the appointment requested by the client, etc. In summary, Pisox will be a client management app with a view for the client and another for the technicians.',
        'Tool that allows Pisox technicians to prepare quotes for work to be carried out in the client\'s home. The quote is generated from a form that the technician completes with client data, type of work, necessary materials, and other details. Once completed, the quote is saved in the database and can be sent to the client by email or downloaded in PDF or image format for later sending.',
        "Complete digital newspaper 'La Reconquista'. Comprehensive web platform that includes real-time internal chat for communication between writers and editors, intelligent notification system, thematic section organization, complete news creation and management with multiple publication statuses. Features an innovative built-in content editor that allows rich text formatting, inserting images, videos and multimedia content, managing drafts and scheduling publications. Facilitates collaborative work with user role system, version control and content approval workflow before publication.",
        'Collaborative university project developed with the goal of replicating the Netflix platform and all its main functionalities. Includes user authentication system, movie and series catalog, content search and filtering, video playback, user profiles, custom lists, and recommendation system. Implemented with modern technologies and REST API consumption to manage multimedia content.'
      ]
    },
    contact: {
      title: 'Contact',
      subtitle: 'Do you have a project in mind? Let’s talk!',
      successMessage: '✅ Message sent successfully! Thank you for contacting me.',
      cards: {
        email: 'Email',
        phone: 'Phone',
        github: 'GitHub',
        linkedin: 'LinkedIn',
        viewProfile: 'View profile',
        connect: 'Connect'
      },
      form: {
        name: 'Name',
        email: 'Email',
        subject: 'Subject',
        message: 'Message',
        placeholderName: 'Your name',
        placeholderEmail: 'you@email.com',
        placeholderSubject: 'Message subject',
        placeholderMessage: 'Your message...',
        submit: 'Send Message',
        send: 'Send Message',
        mailBodyLabels: {
          name: 'Name',
          email: 'Email',
          message: 'Message'
        }
      }
    },
    footer: {
      headline: 'Full Stack Developer passionate about building innovative solutions and great web experiences.',
      quickLinks: 'Quick Links',
      connect: 'Connect with me',
      rights: 'All rights reserved.',
      links: {
        home: 'Home',
        about: 'About',
        skills: 'Skills',
        projects: 'Projects',
        contact: 'Contact'
      }
    }
  }
};

function App() {
  const portfolioData = data[0];
  const [lang, setLang] = useState('es');

  const copy = useMemo(() => translations[lang], [lang]);

  const handleToggleLanguage = () => {
    setLang((prev) => (prev === 'es' ? 'en' : 'es'));
  };

  return (
    <div className="App">
      <Navbar labels={copy.navbar} onToggleLanguage={handleToggleLanguage} lang={lang} />
      <Hero data={portfolioData} labels={copy.hero} cvLink={lang === 'es' ? portfolioData.cv_es : portfolioData.cv_en} />
      <About data={portfolioData} labels={copy.about} lang={lang} />
      <Skills data={portfolioData} labels={copy.skills} />
      <Projects data={portfolioData} labels={copy.projects} lang={lang} />
      <Contact data={portfolioData} labels={copy.contact} />
      <Footer data={portfolioData} labels={copy.footer} />
    </div>
  )
}

export default App
