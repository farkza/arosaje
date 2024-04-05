import React from 'react';
import placeholderImage from '../img/plante.png';
import '../css/PlantesContainer.css';

function PlantesContainer({ plantes, showAll }) {
  return (
    <div className="plantes-container">
      <div className="plante-cards">
        {plantes.slice(0, showAll ? plantes.length : 5).map(plante => (
          <div key={plante.id} className="plante-card">
            <img src={placeholderImage} alt={plante.nom} className="plante-img" />
            <h3>{plante.nom}</h3>
            <p>Poids : {plante.poids}</p>
            <p>Espèces : {plante.especes}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlantesContainer;
