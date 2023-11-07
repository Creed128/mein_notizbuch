// src/App.js

import React from 'react';
import './styles/main.css';
import NotizListe from './Komponenten/NotizListe/NotizListe';
import NeueNotizFormular from './Komponenten/NotizFormular/NeueNotizFormular';
import search from './Komponenten/search/search';

const App = () => {
  const [notizen, setNotizen] = React.useState([
    { id: 1, title: 'Notiz 1', content: 'Inhalt von Notiz 1' },
    { id: 2, title: 'Notiz 2', content: 'Inhalt von Notiz 2' },
    { id: 3, title: 'Notiz 3', content: 'Inhalt von Notiz 3' }
    // ... andere Notizen
  ]);

  const handleNeueNotiz = (neueNotiz) => {
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

  const handleSichtbarkeitChange = (e) => {
    setSichtbarkeit(e.target.value);
  };

  const filterNachSuchbegriff = (notiz, eingabe) => {
    return (
      notiz.title.toLowerCase().includes(eingabe) ||
      notiz.erstellungsdatum.toLowerCase().includes(eingabe)
    );
  };

  const filterNachSichtbarkeit = (notiz) => {
    if (sichtbarkeit === 'alle') {
      return true;
    } else if (sichtbarkeit === 'oeffentlich') {
      return notiz.isPublic;
    } else {
      return !notiz.isPublic;
    }
  };

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
      <h1>Mein Notizbuch App</h1>
      <NeueNotizFormular onNeueNotiz={handleNeueNotiz} />
      <div id="searchContainer">
        <input type="text" id="searchInput" placeholder="Suche..." />
        <button id="searchButton">Suchen</button>
      </div>
      <NotizListe notizen={notizen} />
    </div>
  );
};

export default App;
