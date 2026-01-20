import { create } from 'zustand';

const LS = {
  theme: 'theme',
  lang: 'lang',
  reduceMotion: 'reduceMotion',
  accent: 'accentColor',
};

const useThemeStore = create((set) => ({
  theme: localStorage.getItem(LS.theme) || 'light',
  lang: localStorage.getItem(LS.lang) || 'es',
  reduceMotion: localStorage.getItem(LS.reduceMotion) === '1',
  accentColor: localStorage.getItem(LS.accent) || '#2563eb',

  toggleTheme: () =>
    set((state) => {
      const newTheme = state.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem(LS.theme, newTheme);
      return { theme: newTheme };
    }),

  setLanguage: (lang) =>
    set(() => {
      localStorage.setItem(LS.lang, lang);
      return { lang };
    }),

  setReduceMotion: (val) =>
    set(() => {
      localStorage.setItem(LS.reduceMotion, val ? '1' : '0');
      return { reduceMotion: !!val };
    }),

  setAccentColor: (color) =>
    set(() => {
      localStorage.setItem(LS.accent, color);
      return { accentColor: color };
    }),
}));

export default useThemeStore;

