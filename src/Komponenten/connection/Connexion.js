import React, { useState } from 'react';
import './Connexion.css'; 

const Connexion = ({ benutzerVerbunden, setBenutzerVerbunden }) => {
  const [benutzername, setBenutzername] = useState('');
  const [passwort, setPasswort] = useState('');
  const [fehlermeldung, setFehlermeldung] = useState('');
  const [benutzer, setBenutzer] = useState([]);

  const handleLogin = () => {
    const gefundenerBenutzer = benutzer.find(
      (user) => user.benutzername === benutzername && user.passwort === passwort
    );

    if (gefundenerBenutzer) {
      setBenutzerVerbunden({ isConnected: true, username: benutzername });
      setFehlermeldung('');
    } else {
      setFehlermeldung('Benutzername oder Passwort ist falsch.');
    }
  };

  const handleLogout = () => {
    setBenutzerVerbunden({ isConnected: false, username: '' });
    setBenutzername('');
    setPasswort('');
  };

  const handleRegistration = () => {
    if (benutzer.some((user) => user.benutzername === benutzername)) {
      setFehlermeldung('Benutzername bereits vorhanden.');
    } else {
      setBenutzer([...benutzer, { benutzername, passwort }]);
      setFehlermeldung('');
      setBenutzername('');
      setPasswort('');
    }
  };

  return (
    <div>
      {benutzerVerbunden && benutzerVerbunden.isConnected ? (
        <div>
          <p>Eingeloggt als: {benutzerVerbunden.username}</p>
          <button onClick={handleLogout}>Ausloggen</button>
        </div>
      ) : (
        <div>
          <label>Benutzername:</label>
          <input
            type="text"
            value={benutzername}
            onChange={(e) => setBenutzername(e.target.value)}
          />
          <label>Passwort:</label>
          <input
            type="password"
            value={passwort}
            onChange={(e) => setPasswort(e.target.value)}
          />
          <button onClick={handleLogin}>Einloggen</button>
          <button onClick={handleRegistration}>Registrieren</button>
          <p style={{ color: 'red' }}>{fehlermeldung}</p>
        </div>
      )}
    </div>
  );
};

export default Connexion;
