import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import FilterBar from '../components/FilterBar'; 
import '../css/Explorer.css';
import header from '../img/header.png';

function Explorer() {
  const [plantes, setPlantes] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      setIsLoggedIn(true);
    }

    fetch('http://localhost:8000/get_plantes_from_db')
      .then(response => response.json())
      .then(data => setPlantes(data.plantes))
      .catch(error => console.error('Erreur lors de la récupération des plantes :', error));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <div className="header-container">
        <img src={header} alt="Header" className="header-img" />
      </div>
      <FilterBar /> {/* Intégration du composant FilterBar */}
      <div className="explorer-content">
        <section>
          <h2>Proche de chez vous</h2>
          <div className="plantes-container">
            {plantes.map(plante => (
              <div key={plante[0]} className="plante">
                <h3>{plante[1]}</h3>
                <p>Poids : {plante[2]}</p>
                <p>Espèces : {plante[3]}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2>Catégories</h2>
        </section>

        <section>
          <h2>Publications récentes</h2>
        </section>
      </div>
    </div>
  );
}

export default Explorer;
