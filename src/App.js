import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Connexion from './Komponenten/connection/Connexion';
import Home from './Komponenten/Home'; // Assurez-vous que ce composant existe ou créez-le

const App = () => {
  const [benutzerVerbunden, setBenutzerVerbunden] = useState({ isConnected: false, username: '' });

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Connexion setBenutzerVerbunden={setBenutzerVerbunden} />} />
        <Route path="/home" element={benutzerVerbunden.isConnected ? <Home /> : <Navigate replace to="/login" />} />
        <Route path="*" element={<Navigate replace to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
