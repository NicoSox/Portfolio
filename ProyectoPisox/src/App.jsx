import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Maininisession from './components/IniSession/Maininisession.jsx';
import Home from './pages/Home.jsx';
import Profile from './pages/Profile.jsx'
import './index.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Maininisession />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
