import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar'; 
import '../css/Explorer.css';

function Explorer() {
  const [plantes, setPlantes] = useState([]);

  useEffect(() => {
    // Effectuez la requête GET pour récupérer les plantes depuis l'API
    fetch('http://localhost:8000/get_plantes_from_db')
      .then(response => response.json())
      .then(data => setPlantes(data.plantes)) 
      .catch(error => console.error('Erreur lors de la récupération des plantes :', error));
  }, []);

  return (
    <div>
      <Navbar />
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
