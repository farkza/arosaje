import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importer useNavigate pour la redirection
import Navbar from '../components/Navbar'; 
import '../css/Explorer.css';

function Explorer() {
  const [plantes, setPlantes] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // État pour suivre la connexion
  const navigate = useNavigate(); // Utiliser useNavigate pour la redirection

  useEffect(() => {
    // Vérifiez si l'utilisateur est connecté au chargement de la page
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      setIsLoggedIn(true);
    }

    // Effectuez la requête GET pour récupérer les plantes depuis l'API
    fetch('http://localhost:8000/get_plantes_from_db')
      .then(response => response.json())
      .then(data => setPlantes(data.plantes)) 
      .catch(error => console.error('Erreur lors de la récupération des plantes :', error));
  }, []);

  // Fonction de déconnexion
  const handleLogout = () => {
    localStorage.removeItem('accessToken'); // Supprimer l'access_token du stockage local
    setIsLoggedIn(false); // Définir l'état de connexion à false
    navigate('/login'); // Rediriger l'utilisateur vers la page de connexion
  };

  return (
    <div>
      <Navbar />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {isLoggedIn && <p style={{ color: 'green' }}>Vous êtes connecté</p>}
        {isLoggedIn && <button onClick={handleLogout}>Déconnexion</button>}
      </div>
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
