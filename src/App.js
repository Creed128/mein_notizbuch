import React, { useState, useEffect } from 'react';
import './styles/main.css';
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

  // Charger les notes du localStorage au chargement du composant
  useEffect(() => {
    const gespeicherteNotizen = abrufenAusLocalStorage('notizen');
    if (gespeicherteNotizen) {
      setNotizen(gespeicherteNotizen);
    }
  }, []);

  // Sauvegarder les notes dans le localStorage à chaque modification
  useEffect(() => {
    speichernImLocalStorage('notizen', notizen);
  }, [notizen]);

  // Gérer l'ajout d'une nouvelle note
  const handleNeueNotiz = (neueNotiz) => {
    neueNotiz.erstellungsdatum = new Date().toLocaleString();
    neueNotiz.isPublic = neueNotiz.isPublic && benutzerVerbunden.isConnected; // Ajustez selon votre logique
    neueNotiz.owner = benutzerVerbunden.username;
    setNotizen([...notizen, neueNotiz]);
  };

  // Gérer le changement de critère de recherche
  const handleSuchbegriffChange = (e) => {
    setSuchbegriff(e.target.value.toLowerCase());
  };

  // Gérer le changement de la méthode de tri
  const handleSortierungChange = (e) => {
    setSortierung(e.target.value);
  };

  // Gérer le changement de la visibilité des notes
  const handleSichtbarkeitChange = (e) => {
    setSichtbarkeit(e.target.value);
  };

  // Gérer la mise à jour d'une note
  const handleNotizAktualisierung = (id, aktualisierteNotiz) => {
    const aktualisierteNotizen = notizen.map((notiz) =>
      notiz.id === id ? { ...notiz, ...aktualisierteNotiz } : notiz
    );
    setNotizen(aktualisierteNotizen);
  };

  // Gérer la suppression d'une note
  const handleNotizLoeschen = (id) => {
    const aktualisierteNotizen = notizen.filter((notiz) => notiz.id !== id);
    setNotizen(aktualisierteNotizen);
  };

  // Filtrer et trier les notes
  const gefilterteNotizen = notizen
    .filter((notiz) => notiz.title.toLowerCase().includes(suchbegriff) &&
                       (notiz.isPublic || (benutzerVerbunden.isConnected && notiz.owner === benutzerVerbunden.username)))
    .sort((a, b) => {
      if (sortierung === 'titel') {
        return a.title.localeCompare(b.title);
      } else if (sortierung === 'erstellungsdatum') {
        return a.erstellungsdatum.localeCompare(b.erstellungsdatum);
      }
      return 0;
    });

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
