// App.js
import React, { useState, useEffect } from 'react';
import './styles/main.css';
import NotizListe from './Komponenten/NotizListe/NotizListe';
import NeueNotizFormular from './Komponenten/NotizFormular/NeueNotizFormular';
import { speichernImLocalStorage, abrufenAusLocalStorage } from './Hilfsmittel/localStorage';
import Connexion from './Komponenten/connection/Connexion';

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

  // Fonction de filtre par terme de recherche
  const filterNachSuchbegriff = (notiz, eingabe) => {
    return (
      notiz.title.toLowerCase().includes(eingabe) ||
      notiz.erstellungsdatum.toLowerCase().includes(eingabe)
    );
  };

  // Fonction pour gérer le changement du terme de recherche
  const handleSuchbegriffChange = (e) => {
    const eingabe = e.target.value.toLowerCase();
    setSuchbegriff(eingabe);
  };

  // Fonction pour gérer le changement de la méthode de tri
  const handleSortierungChange = (e) => {
    setSortierung(e.target.value);
  };

  // Fonction pour gérer le changement de la visibilité
  const handleSichtbarkeitChange = (e) => {
    setSichtbarkeit(e.target.value);
  };

  // Fonction pour gérer l'ajout d'une nouvelle note
  const handleNeueNotiz = (neueNotiz) => {
    if (benutzerVerbunden.isConnected || !neueNotiz.isPublic) {
      neueNotiz.isPublic = sichtbarkeit === 'oeffentlich';
      neueNotiz.owner = benutzerVerbunden.username;
      setNotizen([...notizen, neueNotiz]);
    } else {
      alert('Sie müssen angemeldet sein, um private Notizen zu erstellen.');
    }
  };

  // Fonction pour gérer la mise à jour d'une note
  const handleNotizAktualisierung = (id, aktualisierteNotiz) => {
    const aktualisierteNotizen = notizen.map((notiz) =>
      notiz.id === id ? { ...notiz, ...aktualisierteNotiz } : notiz
    );
    setNotizen(aktualisierteNotizen);
  };

  // Fonction pour gérer la suppression d'une note
  const handleNotizLoeschen = (id) => {
    const bestaetigung = window.confirm('Sind Sie sicher, dass Sie diese Notiz löschen möchten?');
    if (bestaetigung) {
      const aktualisierteNotizen = notizen.filter((notiz) => notiz.id !== id);
      setNotizen(aktualisierteNotizen);
    }
  };

  // Filtrage des notes selon les critères
  const filterNachSichtbarkeit = (notiz) => {
    if (sichtbarkeit === 'alle') {
      return true;
    } else if (sichtbarkeit === 'oeffentlich') {
      return notiz.isPublic;
    } else {
      return benutzerVerbunden.isConnected && notiz.owner === benutzerVerbunden.username;
    }
  };

  // Filtrage final des notes
  const gefilterteNotizen = notizen
    .filter((notiz) => filterNachSuchbegriff(notiz, suchbegriff) && filterNachSichtbarkeit(notiz))
    .sort((a, b) => {
      if (sortierung === 'titel') {
        return a.title.localeCompare(b.title);
      } else if (sortierung === 'erstellungsdatum') {
        return a.erstellungsdatum.localeCompare(b.erstellungsdatum);
      }
      return 0;
    });

  return (
    <div>
      <div className="head">
        <h1>Mein Notizbuch App</h1>
        <Connexion
          benutzerVerbunden={benutzerVerbunden}
          setBenutzerVerbunden={setBenutzerVerbunden}
        />
        <NeueNotizFormular
          hinzufuegenNotiz={handleNeueNotiz}
          benutzerVerbunden={benutzerVerbunden}
        />
        <input
          type="text"
          placeholder="Suche nach Notizen..."
          value={suchbegriff}
          onChange={handleSuchbegriffChange}
        />
        <select value={sortierung} onChange={handleSortierungChange}>
          <option value="titel">Sortieren nach Titel</option>
          <option value="erstellungsdatum">Sortieren nach Erstellungsdatum</option>
        </select>
        <select value={sichtbarkeit} onChange={handleSichtbarkeitChange}>
          <option value="alle">Alle Notizen anzeigen</option>
          <option value="oeffentlich">Nur öffentliche Notizen anzeigen</option>
          {benutzerVerbunden.isConnected && (
            <option value="privat">Nur private Notizen anzeigen</option>
          )}
        </select>
      </div>
      <NotizListe
        notizen={gefilterteNotizen}
        bearbeiteNotiz={handleNotizAktualisierung}
        loescheNotiz={handleNotizLoeschen}
      />
    </div>
  );
};

export default App;
