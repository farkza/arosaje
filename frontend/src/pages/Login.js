import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import '../css/Login.css';
import '../styles.css';
import logo from '../img/arosaje.png';
import userIcon from '../img/user.svg';
import passwordIcon from '../img/pwd.svg';

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/login', {
        username: username,
        password: password
      });
      const accessToken = response.data.access_token;
      localStorage.setItem('accessToken', accessToken);
      setIsLoggedIn(true);
      navigate('/explorer');
    } catch (error) {
      setError('Identifiants incorrects');
    }
  };

  if (isLoggedIn) {
    navigate('/explorer');
  }

  return (
    <div className="login-container">
      <div className="login-content">
        <img src={logo} alt="Logo" className="logo_login" />
        <h1 className="appName_login">Arosaje</h1>
        <h2 className="secondary-title">Connectez-vous</h2>
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
