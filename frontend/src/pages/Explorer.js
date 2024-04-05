import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import FilterBar from '../components/FilterBar';
import PlantesContainer from '../components/PlantesContainer';
// import '../css/Explorer.css';
import '../styles.css';
import header from '../img/header.png';

function Explorer() {
  const [plantes, setPlantes] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    nom: '',
    poids: '',
    especes: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      navigate('/login'); // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
    }

    fetch('http://localhost:8000/get_plantes_from_db')
      .then(response => response.json())
      .then(data => setPlantes(data.plantes))
      .catch(error => console.error('Erreur lors de la récupération des plantes :', error));
  }, [navigate]); // Utiliser navigate comme dépendance pour que useEffect soit déclenché à chaque changement de navigate

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setIsLoggedIn(false);
    navigate('/login');
  };

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  const handleAddListing = () => {
    setShowPopup(true);
    document.body.classList.add('popup-open');
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    document.body.classList.remove('popup-open');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const generateUniqueID = () => {
    // Générer un ID unique (par exemple, un nombre aléatoire)
    return Math.floor(Math.random() * 1000000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { nom, poids, especes } = formData;

    const planteData = {
      id: generateUniqueID(), // Générer un ID unique
      nom: nom,
      poids: parseFloat(poids),
      especes: especes
    };

    fetch('http://localhost:8000/add_plante', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(planteData),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Plante ajoutée avec succès :', data);
      setShowPopup(false);
      document.body.classList.remove('popup-open');
      setFormData({
        nom: '',
        poids: '',
        especes: ''
      });
    })
    .catch(error => console.error('Erreur lors de l\'ajout de la plante :', error));
  };

  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <div className="header-container">
        <img src={header} alt="Header" className="header-img" />
      </div>
      <FilterBar />
      <div className="explorer-content">
        <section className="nearYou">
          <div className="add-listing-button-container">
            <button onClick={handleAddListing} className="add-listing-button">
              Déposer une annonce
            </button>
          </div>
        </section>
        <section className="nearYou">
          <h2 className='nearYou'>Proche de chez vous</h2>
          <button onClick={toggleShowAll} className="show-all-button">
            {showAll ? 'Réduire' : 'Afficher tout'}
          </button>
        </section>

        <PlantesContainer plantes={plantes} showAll={showAll} />

        <section className="categories">
          <h2>Catégories</h2>
          <div className="category-container">
            <div className="category-block"></div>
            <div className="category-block"></div>
            <div className="category-block"></div>
            <div className="category-block"></div>
            <div className="category-block"></div>
          </div>
        </section>

        <section className="recent">
          <h2>Les plus récents</h2>
          <PlantesContainer plantes={plantes} showAll={showAll} />
        </section>
      </div>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={handleClosePopup}>&times;</span>
            <h2>Ajouter une plante</h2>
            <form onSubmit={handleSubmit}>
              <label htmlFor="nom">Nom :</label>
              <input type="text" id="nom" name="nom" value={formData.nom} onChange={handleChange} />
              <label htmlFor="poids">Poids :</label>
              <input type="number" id="poids" name="poids" value={formData.poids} onChange={handleChange} />
              <label htmlFor="especes">Espèces :</label>
              <input type="text" id="especes" name="especes" value={formData.especes} onChange={handleChange} />
              <button type="submit">Ajouter</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Explorer;
