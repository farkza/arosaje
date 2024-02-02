import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [plantes, setPlantes] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/plantes')
      .then(response => response.json())
      .then(data => setPlantes(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="App">
      <h1>Liste des plantes</h1>
      <ul>
        {plantes.map(plante => (
          <li key={plante.id}>
            <strong>Nom:</strong> {plante.nom}, <strong>Poids:</strong> {plante.poids}, <strong>Espèce:</strong> {plante.especes}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
