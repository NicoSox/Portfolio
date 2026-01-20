import React, { useState, useEffect } from 'react';
// migrated to Tailwind utilities (removed CSS import)
// removed useNavigate: navigation via router not required for single-page scroll

const Main = () => {
  const [info, setInfo] = useState(null);
  const [expandedCards, setExpandedCards] = useState({});
  const [activeImage, setActiveImage] = useState(null);
  const [filterTerm, setFilterTerm] = useState('');

  useEffect(() => {
    fetch('/data.json')
      .then((res) => res.json())
      .then((data) => setInfo(data[0]))
      .catch((err) => console.error('Error al cargar datos:', err));
  }, []);

  useEffect(() => {
    const onFilter = (e) => {
      const term = (e.detail || '').toLowerCase();
      setFilterTerm(term);
    };
    window.addEventListener('projects-filter', onFilter);
    return () => window.removeEventListener('projects-filter', onFilter);
  }, []);

  const toggleExpand = (index) => {
    setExpandedCards((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const openImage = (src) => setActiveImage(src);
  const closeImage = () => setActiveImage(null);

  if (!info) return <p className="text-center py-8">Cargando información...</p>;

  return (
    <div className="main-scrollable">
      <div className="projects-grid max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {info.mis_proyectos.filter(p => {
          if (!filterTerm) return true;
          const term = filterTerm.toLowerCase();
          return (p.nombre || '').toLowerCase().includes(term) || (p.tecnologias || '').toLowerCase().includes(term);
        }).map((proyecto, index) => {
          const isExpanded = !!expandedCards[index];
          const aosDelay = index * 80;

          return (
            <article key={index} data-aos="fade-up" data-aos-delay={aosDelay} className={`relative flex flex-col overflow-hidden rounded-xl ${isExpanded ? 'ring-2 ring-sky-400' : 'shadow-md'} bg-white/80 dark:bg-slate-800/60 hover:scale-[1.01] transition-transform duration-200`}>
              <div className="w-full h-48 md:h-56 bg-slate-100 dark:bg-slate-700 flex items-center justify-center cursor-zoom-in overflow-hidden" onClick={() => openImage(proyecto.imagen_proyecto)}>
                <img src={proyecto.imagen_proyecto} alt={proyecto.nombre} className="w-full h-full object-cover" />
              </div>

              <div className="p-4 flex-1">
                <h3 className="text-lg font-semibold mb-2">{proyecto.nombre}</h3>
                {isExpanded ? (
                  <>
                    <p className="text-sm text-slate-700 dark:text-slate-200 mb-3"><strong>Tecnologías:</strong> {proyecto.tecnologias}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-300 mb-3">{proyecto.descripcion}</p>
                    <a href={proyecto.enlace} target="_blank" rel="noopener noreferrer" className="inline-block bg-sky-600 text-white px-3 py-2 rounded-md">Quiero ver el código</a>
                  </>
                ) : (
                  <p className="text-sm text-slate-600 dark:text-slate-300">{proyecto.descripcion?.slice(0, 120)}{proyecto.descripcion && proyecto.descripcion.length > 120 ? '...' : ''}</p>
                )}
              </div>

              <button onClick={() => toggleExpand(index)} className="absolute bottom-3 left-1/2 transform -translate-x-1/2 bg-white/90 dark:bg-slate-900/80 px-3 py-1 rounded-full shadow">{isExpanded ? '▲' : '▼'}</button>
            </article>
          )
        })}
      </div>

      {activeImage && (
        <div className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4" onClick={closeImage}>
          <img src={activeImage} alt="Imagen ampliada" className="max-w-5xl max-h-full rounded-lg shadow-2xl" />
        </div>
      )}
    </div>
  );
};

export default Main;
