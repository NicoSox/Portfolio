import React, { useEffect, useState } from 'react'
import { FiDownload, FiMail, FiUser, FiSmartphone, FiGithub, FiLinkedin, FiMapPin, FiCheckCircle } from 'react-icons/fi'
import '../styles/css/Portfolio.css'
import localData from '../data/localData.json'

export default function Portfolio() {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  // allow multiple projects to be open at once
  const [openProjects, setOpenProjects] = useState(new Set())

  useEffect(() => {
    let mounted = true
    fetch('/data.json')
      .then((r) => r.json())
      .then((d) => {
        if (!mounted) return
        if (Array.isArray(d) && d.length) setProfile(d[0])
        else setProfile(localData[0])
      })
      .catch(() => {
        if (mounted) setProfile(localData[0])
      })
      .finally(() => mounted && setLoading(false))

    return () => { mounted = false }
  }, [])

  if (loading) return <div className="portfolio-loading">Cargando portfolio…</div>
  if (!profile) return <div className="portfolio-loading">Perfil no encontrado</div>

  const onChange = (e) => setFormState({ ...formState, [e.target.name]: e.target.value })
  const onSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 4000)
    setFormState({ name: '', email: '', message: '' })
  }

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="portfolio-root">

      <section id="home" className="p-hero" data-aos="fade-up">
        <div className="hero-shell">
          <header className="hero-nav">
            <div className="brand-mark">Nico<span className="accent">Soxkij</span></div>
            <nav>
              <button type="button" onClick={() => scrollTo('about')} className="nav-link">Sobre mí</button>
              <button type="button" onClick={() => scrollTo('projects')} className="nav-link">Proyectos</button>
              <button type="button" onClick={() => scrollTo('contact')} className="nav-link">Contacto</button>
            </nav>
            <button type="button" className="cta-ghost" onClick={() => scrollTo('contact')}>Hablemos</button>
          </header>

          <div className="hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">Hola — me llamo</p>
              <h1 className="hero-title">{profile.nombre} {profile.segundo_nombre} <span className="accent">{profile.apellido}</span></h1>
              <p className="subtitle">Desarrollador Full-Stack enfocado en producto, rendimiento y experiencia.</p>
              <p className="subtitle">Construyo apps con React + Node, APIs limpias y bases de datos bien diseñadas.</p>

              <div className="tech-chips">
                <span className="chip">React</span>
                <span className="chip">Node.js</span>
                <span className="chip">MySQL</span>
                <span className="chip">Express</span>
                <span className="chip">REST APIs</span>
              </div>

              <div className="hero-actions">
                <button className="btn primary" onClick={() => scrollTo('projects')}>Ver proyectos</button>
                <a className="btn outline" href={profile.cv || '#'} target="_blank" rel="noreferrer">Descargar CV</a>
                <button className="btn ghost" onClick={() => scrollTo('contact')}>Contacto</button>
              </div>
            </div>

            <div className="hero-media" data-aos="zoom-in">
              <div className="photo-frame">
                <img src={profile.imagen} alt={`${profile.nombre} ${profile.apellido}`} className="profile-photo" />
              </div>
            </div>
          </div>

          <div className="info-row">
            <div className="info-card">
              <p className="info-title">Formación</p>
              <p className="info-text">{profile.facultad} · {profile.carrera}</p>
            </div>
            <div className="info-card">
              <p className="info-title">En camino</p>
              <p className="info-text">{profile.proxima_carrera}</p>
            </div>
            <div className="info-card">
              <p className="info-title">Ubicación</p>
              <p className="info-text">Argentina</p>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="p-about">
        <div className="section-inner about-hero">
          <div className="about-heading">
            <div className="about-copy">
              <h2 className="about-title">Sobre mí</h2>
              <p className="about-subtitle">Soy un desarrollador full-stack especializado en construir soluciones escalables y efectivas. Busco oportunidades para seguir creciendo y aportar valor.</p>
            </div>
            <div className="about-actions">
              <a className="glass-btn primary" href={profile.cv || profile.linkedin} target="_blank" rel="noreferrer"><FiDownload /> Descargar CV</a>
              <a className="glass-btn" href={`mailto:${profile.mail}`}><FiMail /> Contactar</a>
            </div>
          </div>

          <div className="about-panels">
            <div className="about-panel translucent-panel">
              <div className="panel-header">
                <div>
                  <h3>Datos personales</h3>
                  <p className="panel-sub">Perfil y contacto directo.</p>
                </div>
                <span className="panel-pill">Perfil</span>
              </div>

              <div className="panel-section">
                <div className="section-label"><FiUser /> Perfil</div>
                <div className="panel-row">
                  <span className="row-dot" aria-hidden />
                  <div>
                    <p className="row-title">{profile.nombre} {profile.segundo_nombre} {profile.apellido}</p>
                    <p className="row-sub">Full-Stack Developer</p>
                  </div>
                </div>
                <div className="panel-row">
                  <span className="row-dot" aria-hidden />
                  <div>
                    <p className="row-title">Desarrollador Full-Stack</p>
                    <p className="row-sub">Argentina</p>
                  </div>
                </div>
              </div>

              <div className="panel-section">
                <div className="section-label"><FiSmartphone /> Contacto</div>
                <div className="contact-grid">
                  <div className="contact-item"><FiSmartphone /><span>{profile.telefono}</span></div>
                  <div className="contact-item"><FiMail /><a href={`mailto:${profile.mail}`}>{profile.mail}</a></div>
                  <div className="contact-item"><FiGithub /><span>GitHub · <a href={profile.github} target="_blank" rel="noreferrer">LinkedIn</a></span></div>
                </div>
              </div>
            </div>

            <div className="about-panel translucent-panel">
              <div className="panel-header">
                <div>
                  <h3>Tecnologías & Lenguajes</h3>
                  <p className="panel-sub">Stack principal y prácticas de trabajo.</p>
                </div>
                <span className="panel-pill alt">Tech</span>
              </div>

              <div className="chip-groups">
                <div className="chip-group">
                  <p className="chip-label">Frontend</p>
                  <div className="chip-row">
                    {['JavaScript', 'HTML5', 'CSS3', 'React'].map((item) => <span key={item} className="pill-chip">{item}</span>)}
                  </div>
                </div>
                <div className="chip-group">
                  <p className="chip-label">Backend</p>
                  <div className="chip-row">
                    {['Node.js', 'Python', 'Express'].map((item) => <span key={item} className="pill-chip">{item}</span>)}
                  </div>
                </div>
                <div className="chip-group">
                  <p className="chip-label">Base de Datos</p>
                  <div className="chip-row">
                    {['MySQL', 'SQL Server'].map((item) => <span key={item} className="pill-chip">{item}</span>)}
                  </div>
                </div>
                <div className="chip-group">
                  <p className="chip-label">Herramientas</p>
                  <div className="chip-row">
                    {['Git'].map((item) => <span key={item} className="pill-chip">{item}</span>)}
                  </div>
                </div>
              </div>

              <div className="soft-grid">
                {Array.isArray(profile.conocimientos) && profile.conocimientos.map((skill) => (
                  <div key={skill} className="soft-card">
                    <FiCheckCircle />
                    <div>
                      <p className="soft-title">{skill}</p>
                      <p className="soft-note">Planning, dailies, retrospectivas</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="p-projects" data-aos="fade-up">
        <div className="section-inner">
          <h2>Proyectos</h2>
          <p className="lead">Extraídos desde <code>public/data.json</code>. Cada proyecto incluye tecnologías, descripción e enlace al repositorio.</p>

          <div className="projects-grid">
            {Array.isArray(profile.mis_proyectos) && profile.mis_proyectos.map((p) => {
              const slug = String(p.nombre).replace(/\s+/g, '-').toLowerCase()
              const isOpen = openProjects.has(slug)
              return (
                <article key={p.nombre} className={`project-card ${isOpen ? 'open' : ''}`} data-aos="fade-up">
                  <div className="project-media">
                    <img src={p.imagen_proyecto || '/assets/Portfolio-img.png'} alt={p.nombre} loading="lazy" />
                  </div>

                  <div className="project-body">
                    <div className="project-head">
                      <h3>{p.nombre}</h3>
                      <button
                        className={`expand-btn ${isOpen ? 'open' : ''}`}
                        aria-expanded={isOpen}
                        aria-controls={`proj-${slug}`}
                        onClick={() => {
                          setOpenProjects(prev => {
                            const next = new Set(prev)
                            if (next.has(slug)) next.delete(slug)
                            else next.add(slug)
                            return next
                          })
                        }}
                        title={isOpen ? 'Cerrar detalles' : 'Ver detalles'}
                      >
                        <span className="vis">{isOpen ? 'Cerrar' : 'Detalles'}</span>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                    </div>

                    {/* short preview always shown inside the card */}
                    <p className={`proj-desc collapsed`}>{String(p.descripcion).slice(0, 220)}{p.descripcion.length > 220 ? '…' : ''}</p>

                    <div id={`proj-${slug}`} className={`proj-extra ${isOpen ? 'show' : ''}`}>
                      <p className="proj-desc-full" style={{marginBottom:10}}>{p.descripcion}</p>
                      <div className="proj-tags">
                        {String(p.tecnologias).split(',').map((t) => <span key={t} className="proj-tag">{t.trim()}</span>)}
                      </div>
                      <div className="proj-actions" style={{marginTop:8}}>
                        <a className="proj-link" href={p.enlace} target="_blank" rel="noreferrer">Ver en GitHub</a>
                      </div>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section id="contact" className="p-contact" data-aos="fade-up">
        <div className="section-inner">
          <h2>Contacto</h2>
          <p className="lead">Si te interesa trabajar conmigo, rellena el formulario o envíame un email directamente.</p>

          <div className="contact-grid">
            <form className="contact-form translucent-panel" onSubmit={onSubmit} aria-label="Formulario de contacto">
              <label>Nombre</label>
              <input name="name" value={formState.name} onChange={onChange} required />
              <label>Email</label>
              <input name="email" type="email" value={formState.email} onChange={onChange} required />
              <label>Mensaje</label>
              <textarea name="message" rows={6} value={formState.message} onChange={onChange} required />
              <div className="form-actions">
                <button className="btn primary" type="submit">Enviar</button>
                <a className="btn ghost" href={`mailto:${profile.mail}`}>Enviar por email</a>
              </div>
              {sent && <p className="sent-note">Mensaje simulado enviado ✅</p>}
            </form>

            <div className="contact-help">
              <div className="translucent-panel">
                <h3>Contacto directo</h3>
                <p><strong>Email:</strong> <a href={`mailto:${profile.mail}`}>{profile.mail}</a></p>
                <p><strong>Teléfono:</strong> {profile.telefono}</p>
                <p><strong>Disponibilidad:</strong> Freelance / Colaboraciones</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="portfolio-footer">
        <div className="section-inner">© {new Date().getFullYear()} {profile.nombre} {profile.apellido} — Portfolio generado profesionalmente.</div>
      </footer>
    </div>
  )
}
