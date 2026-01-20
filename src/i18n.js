const translations = {
  es: {
    inicio: 'Inicio',
    about: 'Sobre mí',
    projects: 'Proyectos',
    contact: 'Contacto',
    openMenu: 'Abrir menú',
    closeMenu: 'Cerrar menú',
    downloadCV: 'Descargar CV',
    themeDark: 'Tema oscuro',
    themeLight: 'Tema claro',
    reduceMotion: 'Reducir animaciones',
    accentColor: 'Color de acento',
    searchProjects: 'Buscar proyectos...',
  },
  en: {
    inicio: 'Home',
    about: 'About',
    projects: 'Projects',
    contact: 'Contact',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    downloadCV: 'Download CV',
    themeDark: 'Dark theme',
    themeLight: 'Light theme',
    reduceMotion: 'Reduce animations',
    accentColor: 'Accent color',
    searchProjects: 'Search projects...',
  },
};

export function useI18n(defaultLocale = 'es') {
  const locale = localStorage.getItem('lang') || defaultLocale;
  function t(key) {
    return (translations[locale] && translations[locale][key]) || translations.es[key] || key;
  }
  function setLocale(l) {
    localStorage.setItem('lang', l);
  }
  return { t, locale, setLocale };
}
