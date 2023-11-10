import React, { useState, useEffect } from 'react';
import './styles/main.css';
import NotizListe from './Komponenten/NotizListe/NotizListe';
import NeueNotizFormular from './Komponenten/NotizFormular/NeueNotizFormular';
import { speichernImLocalStorage, abrufenAusLocalStorage } from './Hilfsmittel/localStorage';

const App = () => {
  const [notizen, setNotizen] = useState([]);
  const [suchbegriff, setSuchbegriff] = useState('');
  const [sortierung, setSortierung] = useState('titel'); // Sortierung nach Titel standardmäßig

  useEffect(() => {
    const gespeicherteNotizen = abrufenAusLocalStorage('notizen');
    if (gespeicherteNotizen) {
      setNotizen(gespeicherteNotizen);
    }
  }, []);

  useEffect(() => {
    speichernImLocalStorage('notizen', notizen);
  }, [notizen]);

  const handleNeueNotiz = (neueNotiz) => {
    // Füge den aktuellen Status (privat oder öffentlich) zur Notiz hinzu
    console.log(neueNotiz)
    setNotizen([...notizen, neueNotiz]);
  };

  const handleNotizAktualisierung = (id, aktualisierteNotiz) => {
    const aktualisierteNotizen = notizen.map((notiz) =>
      notiz.id === id ? { ...notiz, ...aktualisierteNotiz } : notiz
    );
    setNotizen(aktualisierteNotizen);
  };

  const handleNotizLoeschen = (id) => {
    const bestaetigung = window.confirm('Sind Sie sicher, dass Sie diese Notiz löschen möchten?');
    if (bestaetigung) {
      const aktualisierteNotizen = notizen.filter((notiz) => notiz.id !== id);
      setNotizen(aktualisierteNotizen);
    }
  };

  const handleSuchbegriffChange = (e) => {
    const eingabe = e.target.value.toLowerCase();
    setSuchbegriff(eingabe);
  };

  const handleSortierungChange = (e) => {
    setSortierung(e.target.value);
  };

  const filterNachSuchbegriff = (notiz, eingabe) => {
    return (
      notiz.title.toLowerCase().includes(eingabe) ||
      notiz.erstellungsdatum.toLowerCase().includes(eingabe)
    );
  };


  const gefilterteNotizen = notizen
    .filter((notiz) => filterNachSuchbegriff(notiz, suchbegriff))
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
      <div class="head">
        <h1>Mein Notizbuch App</h1>
        <NeueNotizFormular hinzufuegenNotiz={handleNeueNotiz} />
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
