import React, { useState, useEffect } from 'react';
// migrated to Tailwind utilities (removed component CSS import)
import '../../index.css';

const Main = () => {
  const [info, setInfo] = useState(null);

  useEffect(() => {
    fetch('/data.json')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.length > 0) {
          setInfo(data[0]);
        }
      })
      .catch((err) => console.error('Error al cargar datos:', err));
  }, []);

  if (!info) return <p className="text-center py-8">Cargando información...</p>;

  return (
    <div className="main-scrollable animated fade-in delay-0">

      <div className="about-card mx-auto max-w-4xl p-8 md:p-12 rounded-xl shadow-lg bg-white/80 dark:bg-slate-800/60 text-slate-900 dark:text-slate-100 backdrop-blur-sm">
        <h1 className="text-3xl font-semibold text-center mb-6">About Me</h1>

        <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
          <div className="flex-shrink-0">
            <img
              src={info.imagen}
              alt={`${info.nombre} ${info.apellido}`}
              className="w-36 h-36 md:w-44 md:h-44 rounded-full object-cover shadow-xl"
            />
          </div>

          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold text-sky-600 mb-2">{info.nombre} {info.segundo_nombre} {info.apellido}</h2>
            <div className="space-y-1 text-sm text-slate-700 dark:text-slate-200">
              <p><span className="font-semibold">Edad:</span> {info.edad}</p>
              <p><span className="font-semibold">Facultad:</span> {info.facultad}</p>
              <p><span className="font-semibold">Carrera actual:</span> {info.carrera}</p>
              <p><span className="font-semibold">Próxima carrera:</span> {info.proxima_carrera}</p>
              <p><span className="font-semibold">Email:</span> <a className="text-sky-600 underline" href={`mailto:${info.mail}`}>{info.mail}</a></p>
              <p><span className="font-semibold">Teléfono:</span> <a className="text-sky-600 underline" href={`tel:${info.telefono}`}>{info.telefono}</a></p>
              <p><span className="font-semibold">Redes:</span> <a className="text-sky-600 underline" href={info.github} target="_blank" rel="noopener noreferrer">GitHub</a> <span className="mx-2">|</span> <a className="text-sky-600 underline" href={info.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></p>

              <div className="mt-3">
                <strong className="block mb-2">Lenguajes y tecnologías:</strong>
                <ul className="flex flex-wrap gap-2">
                  {info.lenguajes.map((tech, i) => (
                    <li key={i} className="px-3 py-1 bg-slate-100 dark:bg-slate-700 rounded-full text-sm">{tech}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;

