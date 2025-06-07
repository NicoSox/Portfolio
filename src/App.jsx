
import Home from './pages/Home'
import AboutMe from './pages/AboutMe'
import Proyects from './pages/Proyects'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import useThemeStore from './data/themeStore';
import './styles/css/App.css'
import { useEffect } from 'react';

function App() {
  
  const { theme } = useThemeStore();
  
  useEffect(() => {
    document.body.className = theme === 'dark' ? 'dark-mode' : '';
  }, [theme]);

  return (
    <>
    <div className={theme === 'dark' ? 'dark-theme' : 'light-theme'}>
    <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/AboutMe" element={<AboutMe />} />
            <Route path="/Proyects" element={<Proyects />} />
          </Routes>
    </BrowserRouter>
    </div>
    </>
  )
}

export default App
