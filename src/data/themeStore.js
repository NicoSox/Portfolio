import { create } from 'zustand';

const useThemeStore = create((set) => ({
  theme: localStorage.getItem('theme') || 'light', // leer el valor guardado o default 'light'
  toggleTheme: () =>
    set((state) => {
      const newTheme = state.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme); // guardar el nuevo tema en localStorage
      return { theme: newTheme };
    }),
}));

export default useThemeStore;

