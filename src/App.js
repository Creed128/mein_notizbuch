import React, { useState, useEffect } from 'react';
import './styles/main.css'; // Assurez-vous que cela ne conflictue pas avec les styles de Bootstrap
import NotizListe from './Komponenten/NotizListe/NotizListe';
import NeueNotizFormular from './Komponenten/NotizFormular/NeueNotizFormular';
import { speichernImLocalStorage, abrufenAusLocalStorage } from './Hilfsmittel/localStorage';
import Connexion from './Komponenten/connection/Connexion';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [notizen, setNotizen] = useState([]);
  const [suchbegriff, setSuchbegriff] = useState('');
  const [sortierung, setSortierung] = useState('titel');
  const [sichtbarkeit, setSichtbarkeit] = useState('alle');
  const [benutzerVerbunden, setBenutzerVerbunden] = useState({
    isConnected: false,
    username: '',
  });

  useEffect(() => {
    const gespeicherteNotizen = abrufenAusLocalStorage('notizen');
    if (gespeicherteNotizen) {
      setNotizen(gespeicherteNotizen);
    }
  }, []);

  useEffect(() => {
    speichernImLocalStorage('notizen', notizen);
  }, [notizen]);

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1>Mein Notizbuch App</h1>
          <Connexion
            benutzerVerbunden={benutzerVerbunden}
            setBenutzerVerbunden={setBenutzerVerbunden}
          />
          {benutzerVerbunden.isConnected && (
            <div className="mt-3">
              <NeueNotizFormular
                hinzufuegenNotiz={handleNeueNotiz}
                benutzerVerbunden={benutzerVerbunden}
              />
              <input
                type="text"
                className="form-control mt-2"
                placeholder="Suche nach Notizen..."
                value={suchbegriff}
                onChange={handleSuchbegriffChange}
              />
              <div className="d-flex justify-content-start mt-2">
                <select className="form-select me-2" value={sortierung} onChange={handleSortierungChange}>
                  <option value="titel">Sortieren nach Titel</option>
                  <option value="erstellungsdatum">Sortieren nach Erstellungsdatum</option>
                </select>
                <select className="form-select" value={sichtbarkeit} onChange={handleSichtbarkeitChange}>
                  <option value="alle">Alle Notizen anzeigen</option>
                  <option value="oeffentlich">Nur öffentliche Notizen anzeigen</option>
                  {benutzerVerbunden.isConnected && (
                    <option value="privat">Nur private Notizen anzeigen</option>
                  )}
                </select>
              </div>
            </div>
          )}
        </div>
      </div>
      <NotizListe
        notizen={gefilterteNotizen}
        bearbeiteNotiz={handleNotizAktualisierung}
        loescheNotiz={handleNotizLoeschen}
        benutzerVerbunden={benutzerVerbunden}
      />
    </div>
  );
};

export default App;
