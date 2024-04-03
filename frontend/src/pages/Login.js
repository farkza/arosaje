import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/Login.css';
import logo from '../img/arosaje.png';
import userIcon from '../img/user.svg';
import passwordIcon from '../img/pwd.svg';

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
    <div className="login-container">
      <div className="login-content">
        <img src={logo} alt="Logo" className="logo_login" />
        <h1 className="appName_login">Arosaje</h1>
        <h2 className="secondary-title">Connectez-vous</h2>
        {isLoggedIn && <p style={{ color: 'green' }}>Vous êtes connecté</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {!isLoggedIn && (
          <div>
            <div className="input-container">
              <input type="text" placeholder="Utilisateur" value={username} onChange={(e) => setUsername(e.target.value)} style={{ backgroundImage: `url(${userIcon})`, backgroundSize: '20px', backgroundPosition: '10px center', backgroundRepeat: 'no-repeat', paddingLeft: '40px', color: 'black' }} />
            </div>
            <div className="input-container">
              <input type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} style={{ backgroundImage: `url(${passwordIcon})`, backgroundSize: '20px', backgroundPosition: '10px center', backgroundRepeat: 'no-repeat', paddingLeft: '40px', color: 'black' }} />
            </div>
            <button className="login-button" onClick={handleLogin}>Se connecter</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
