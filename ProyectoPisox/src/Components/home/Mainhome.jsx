import '../../Style/css/Home.css';
import Aire from '../../assets/img-aire.jpg';
import { useState } from 'react';
import Navbarjobs from '../Navbarjobs';

const Mainhome = () => {
  const [activeTab, setActiveTab] = useState('Todos');

  // Acá podrías aplicar filtros dinámicos si tenés los datos separados
  const allCards = [
    { tipo: 'Aires', marca: 'Samsung', lugar: 'Oficina' },
    { tipo: 'Calefacción', marca: 'BGH', lugar: 'Casa' },
    { tipo: 'Ventilación', marca: 'Liliana', lugar: 'Taller' },
    { tipo: 'Aires', marca: 'LG', lugar: 'Living' },
    // ... más
  ];

  const filteredCards = activeTab === 'Todos'
    ? allCards
    : allCards.filter(card => card.tipo === activeTab);

  return (
    <>
      <Navbarjobs activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="main-scrollable">
        <div className="card-container">
          {filteredCards.map((card, i) => (
            <div className="card" key={i}>
              <img src={Aire} alt="Imagen" className="img-card" />
              <h4>Marca: {card.marca}</h4>
              <h4>Lugar: {card.lugar}</h4>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Mainhome;
