import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // État pour suivre la connexion

  useEffect(() => {
    // Vérifier si l'utilisateur est déjà connecté au chargement de la page
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      setIsLoggedIn(true); // Définir l'état de connexion à vrai s'il y a un token
    }
  }, []);

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/login', {
        username: username,
        password: password
      });
      const accessToken = response.data.access_token;
      // Stocker l'access token dans le localStorage ou dans un état de l'application React
      localStorage.setItem('accessToken', accessToken);
      setIsLoggedIn(true); // Définir l'état de connexion à vrai après une connexion réussie
      // Rediriger l'utilisateur vers une autre page après la connexion réussie
      // Remplacez '/dashboard' par l'URL de la page vers laquelle vous souhaitez rediriger l'utilisateur
      window.location.href = '/';
    } catch (error) {
      setError('Identifiants incorrects');
    }
  };

  return (
    <div>
      <h2>Connexion</h2>
      {isLoggedIn && <p style={{ color: 'green' }}>Vous êtes connecté</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!isLoggedIn && ( // Afficher le formulaire de connexion seulement si l'utilisateur n'est pas déjà connecté
        <div>
          <div>
            <label>Utilisateur:</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div>
            <label>Mot de passe:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button onClick={handleLogin}>Se connecter</button>
        </div>
      )}
    </div>
  );
}

export default Login;
