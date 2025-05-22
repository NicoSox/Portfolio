// src/components/Navbarjobs.jsx
import React from 'react';
import '../Style/css/Navbarjobs.css';

const Navbarjobs = ({ activeTab, setActiveTab }) => {
  const tabs = ['Todos', 'Aires', 'Calefacción', 'Ventilación'];

  return (
    <nav className="navbarjobs">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`tab-button ${activeTab === tab ? 'active' : ''}`}
          onClick={() => setActiveTab(tab)}
        >
          {tab}
        </button>
      ))}
    </nav>
  );
};

export default Navbarjobs;
