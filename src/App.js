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

  // Funktion für die Filterung nach Suchbegriff
  const filterNachSuchbegriff = (notiz, eingabe) => {
    return (
      notiz.title.toLowerCase().includes(eingabe) ||
      notiz.erstellungsdatum.toLowerCase().includes(eingabe)
    );
  };

  // Funktion zum Bearbeiten des Suchbegriffs
  const handleSuchbegriffChange = (e) => {
    const eingabe = e.target.value.toLowerCase();
    setSuchbegriff(eingabe);
  };

  // Funktion zum Ändern der Sortiermethode
  const handleSortierungChange = (e) => {
    setSortierung(e.target.value);
  };

  // Funktion zum Ändern der Sichtbarkeit
  const handleSichtbarkeitChange = (e) => {
    setSichtbarkeit(e.target.value);
  };

  // Funktion zum Hinzufügen einer neuen Notiz
  const handleNeueNotiz = (neueNotiz) => {
    if (!benutzerVerbunden.isConnected) {
      if (neueNotiz.isPublic) {
        neueNotiz.erstellungsdatum = new Date().toLocaleString();
        setNotizen([...notizen, neueNotiz]);
      } else {
        alert('Sie müssen angemeldet sein, um private Notizen zu erstellen.');
      }
    } else {
      neueNotiz.erstellungsdatum = new Date().toLocaleString();
      neueNotiz.isPublic = neueNotiz.isPublic && benutzerVerbunden.isConnected;
      neueNotiz.owner = benutzerVerbunden.username;
      setNotizen([...notizen, neueNotiz]);
    }
  };

  // Funktion zum Aktualisieren einer Notiz
  const handleNotizAktualisierung = (id, aktualisierteNotiz) => {
    const aktualisierteNotizen = notizen.map((notiz) =>
      notiz.id === id ? { ...notiz, ...aktualisierteNotiz } : notiz
    );
    setNotizen(aktualisierteNotizen);
  };

  // Funktion zum Löschen einer Notiz
  const handleNotizLoeschen = (id) => {
    const bestaetigung = window.confirm('Sind Sie sicher, dass Sie diese Notiz löschen möchten?');
    if (bestaetigung) {
      const aktualisierteNotizen = notizen.filter((notiz) => notiz.id !== id);
      setNotizen(aktualisierteNotizen);
    }
  };

  // Filtern von Notizen nach Kriterien
  const filterNachSichtbarkeit = (notiz) => {
    if (!benutzerVerbunden.isConnected && !notiz.isPublic) {
      return false;
    }

    if (sichtbarkeit === 'alle') {
      return true;
    } else if (sichtbarkeit === 'oeffentlich') {
      return notiz.isPublic;
    } else {
      return (
        benutzerVerbunden.isConnected &&
        notiz.owner === benutzerVerbunden.username &&
        notiz.isPublic === false
      );
    }
  };

  // Endgültiges Filtern von Notizen
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
        {benutzerVerbunden.isConnected && (
          <>
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
          </>
        )}
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
