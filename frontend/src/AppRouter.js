import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Explorer from './pages/Explorer';
import Plantes from './pages/Plantes';
import Login from './pages/Login';
import MessagingPage from './pages/Messagerie';

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/Login" replace />} />
        <Route path="/Explorer" element={<Explorer />} />
        <Route path="/Plantes" element={<Plantes />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Messagerie" element={<MessagingPage />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
