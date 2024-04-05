import React from 'react';
import '../styles.css';

function MessagingPage() {
  return (
    <div className="messaging-container">
      <div className="header">
        <h1>Ma Boîte de Réception</h1>
      </div>
      <div className="container">
        <div className="sidebar">
          <ul>
            <li><a href="#">Boîte de Réception</a></li>
            <li><a href="#">Messages Envoyés</a></li>
            <li><a href="#">Brouillons</a></li>
            <li><a href="#">Corbeille</a></li>
          </ul>
        </div>
        <div className="main-content">
          <div className="message-list">
            <div className="message-item">
              <div className="sender">John Doe</div>
              <div className="date">20 avril 2024</div>
              <div className="subject">Réunion à venir</div>
              <div className="message-preview">Bonjour, n'oubliez pas notre réunion demain à 10h.</div>
            </div>
            <div className="message-item">
              <div className="sender">Jane Smith</div>
              <div className="date">19 avril 2024</div>
              <div className="subject">Questions sur le projet</div>
              <div className="message-preview">Pouvez-vous m'envoyer une mise à jour sur l'avancement du projet?</div>
            </div>
            {/* Autres messages */}
          </div>
          <div className="message-details">
            {/* Détails du message sélectionné */}
          </div>
        </div>
      </div>
      <div className="footer">
        <p>© 2024 Ma Boîte de Réception. Tous droits réservés.</p>
      </div>
    </div>
  );
}

export default MessagingPage;
