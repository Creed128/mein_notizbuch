import React, { useState } from 'react';

const Connexion = ({ benutzerVerbunden, setBenutzerVerbunden }) => {
  const [benutzername, setBenutzername] = useState('');
  const [passwort, setPasswort] = useState('');
  const [fehlermeldung, setFehlermeldung] = useState('');
  const [benutzer, setBenutzer] = useState([]);

  const handleLogin = () => {
    const gefundenerBenutzer = benutzer.find(
      user => user.benutzername === benutzername && user.passwort === passwort
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
    if (benutzer.some(user => user.benutzername === benutzername)) {
      setFehlermeldung('Benutzername bereits vorhanden.');
    } else {
      setBenutzer([...benutzer, { benutzername, passwort }]);
      setFehlermeldung('');
      setBenutzername('');
      setPasswort('');
    }
  };

  return (
    <div className="container mt-3">
      {benutzerVerbunden && benutzerVerbunden.isConnected ? (
        <div>
          <p>Eingeloggt als: {benutzerVerbunden.username}</p>
          <button className="btn btn-danger" onClick={handleLogout}>Ausloggen</button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label>Benutzername:</label>
            <input
              className="form-control"
              type="text"
              value={benutzername}
              onChange={e => setBenutzername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Passwort:</label>
            <input
              className="form-control"
              type="password"
              value={passwort}
              onChange={e => setPasswort(e.target.value)}
            />
          </div>
          <button className="btn btn-primary" onClick={handleLogin}>Einloggen</button>
          <button className="btn btn-secondary ml-2" onClick={handleRegistration}>Registrieren</button>
          {fehlermeldung && <div className="alert alert-danger mt-2">{fehlermeldung}</div>}
        </div>
      )}
    </div>
  );
};

export default Connexion;
