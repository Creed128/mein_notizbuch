import React, { useState } from 'react';
import './NeueNotizFormular.css';

// Komponente NeueNotizFormular
const NeueNotizFormular = ({ hinzufuegenNotiz, benutzerVerbunden }) => {
  // Zustandsvariablen
  const [titel, setTitel] = useState('');
  const [inhalt, setInhalt] = useState('');
  const [isPublic, setIsPublic] = useState(true);

  // Funktion zum Handhaben der Änderung des Titels
  const handleTitelChange = (e) => {
    setTitel(e.target.value);
  };

  // Funktion zum Handhaben der Änderung des Inhalts
  const handleInhaltChange = (e) => {
    setInhalt(e.target.value);
  };

  // Funktion zum Handhaben der Änderung der Sichtbarkeit
  const handleSichtbarkeitChange = (e) => {
    setIsPublic(e.target.value === 'oeffentlich');
  };

  // Funktion zum Handhaben der Erstellung einer neuen Notiz
  const handleNeueNotiz = () => {
    if (titel && inhalt) {
      const erstellungsdatum = new Date().toLocaleString();
      const neueNotiz = {
        id: Date.now(),
        title: titel,
        content: inhalt,
        isPublic: isPublic,
        erstellungsdatum,
      };

      if (benutzerVerbunden.isConnected) {
        neueNotiz.owner = benutzerVerbunden.username;
      }

      hinzufuegenNotiz(neueNotiz);
      setTitel('');
      setInhalt('');
      setIsPublic(true);
    }
  };

  // JSX-Elemente
  return (
    <div className="new-note">
      <h2>Neue Notiz erstellen</h2>
      <label className="title" htmlFor="title-input">
        Titel:
      </label>
      <input
        className="title-input"
        type="text"
        value={titel}
        onChange={handleTitelChange}
      />
      <label className="content" htmlFor="content-input">
        Inhalt:
      </label>
      <textarea
        className="content-input"
        value={inhalt}
        onChange={handleInhaltChange}
        placeholder="Schreibe hier deine Notizen..."
      />
      <div className="radios">
        <input
          type="radio"
          name="public-private"
          value="oeffentlich"
          checked={isPublic}
          onChange={handleSichtbarkeitChange}
        />
        <label htmlFor="oeffentlich">Öffentlich</label>
        {benutzerVerbunden.isConnected && (
          <>
            <input
              type="radio"
              name="public-private"
              value="privat"
              checked={!isPublic}
              onChange={handleSichtbarkeitChange}
            />
            <label htmlFor="privat">Privat</label>
          </>
        )}
      </div>
      <button className="create-button" onClick={handleNeueNotiz}>
        Notiz erstellen
      </button>
    </div>
  );
};

export default NeueNotizFormular;