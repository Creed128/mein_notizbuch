import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@leecheuk/react-google-login'; // Nur ein Import von GoogleLogin

const Connexion = ({ setBenutzerVerbunden }) => {
  const [benutzername, setBenutzername] = useState('');
  const [passwort, setPasswort] = useState('');
  const [fehlermeldung, setFehlermeldung] = useState('');
  const navigate = useNavigate();
  const googleClientId = "676727747121-9jn8h48vo577r6dlklj4to180hla9689.apps.googleusercontent.com"; // Ersetze DEINE_CLIENT_ID durch deine tatsächliche Client-ID

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Hier kommt die Logik für den lokalen Login.
    if (!benutzername || !passwort) {
      setFehlermeldung('Benutzername und Passwort dürfen nicht leer sein.');
      return;
    }
    // Hier würde normalerweise ein API-Aufruf stehen.
    // Zum Beispiel:
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ benutzername, passwort }),
      });
      if (!response.ok) throw new Error('Login fehlgeschlagen');
      const userData = await response.json();
      setBenutzerVerbunden({ isConnected: true, username: userData.username });
      navigate('/dashboard'); // Navigiere zu einer internen Seite
    } catch (error) {
      setFehlermeldung(error.message);
    }
  };

  const handleLogin = (response) => {
    console.log('Google response:', response);
    setBenutzerVerbunden({ isConnected: true, username: response.profileObj.name });
    navigate('/dashboard'); // Navigiere zu einer internen Seite
  };

  const handleFailure = (error) => {
    console.log('Google Login Fehler:', error);
    setFehlermeldung("Anmeldung mit Google fehlgeschlagen. Bitte versuche es erneut.");
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <h3>Connexion</h3>
            <div className="form-group">
              <label>Benutzername:</label>
              <input
                type="text"
                className="form-control"
                value={benutzername}
                onChange={(e) => setBenutzername(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Passwort:</label>
              <input
                type="password"
                className="form-control"
                value={passwort}
                onChange={(e) => setPasswort(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">Einloggen</button>
            <GoogleLogin
              clientId={googleClientId}
              buttonText="Mit Google anmelden"
              onSuccess={handleLogin}
              onFailure={handleFailure}
              cookiePolicy={'single_host_origin'}
            />
            {fehlermeldung && <div className="alert alert-danger" role="alert">{fehlermeldung}</div>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Connexion;
