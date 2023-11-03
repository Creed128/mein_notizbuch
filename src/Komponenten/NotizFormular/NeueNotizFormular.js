import React, { useState } from 'react';

const NeueNotizFormular = ({ hinzufuegenNotiz }) => {
  const [titel, setTitel] = useState('');
  const [inhalt, setInhalt] = useState('');

  const handleTitelChange = (e) => {
    setTitel(e.target.value);
  };

  const handleInhaltChange = (e) => {
    setInhalt(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Hier kannst du die Funktion hinzufuegenNotiz aufrufen und die neuen Notizdaten übergeben
    hinzufuegenNotiz({ titel, inhalt });
    // Setze die Eingabefelder zurück
    setTitel('');
    setInhalt('');
  };

  return (
    <div>
      <h2>Neue Notiz erstellen</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Titel:
          <input type="text" value={titel} onChange={handleTitelChange} />
        </label>
        <br />
        <label>
          Inhalt:
          <textarea value={inhalt} onChange={handleInhaltChange} />
        </label>
        <br />
        <button type="submit">Notiz erstellen</button>
      </form>
    </div>
  );
};

export default NeueNotizFormular;
