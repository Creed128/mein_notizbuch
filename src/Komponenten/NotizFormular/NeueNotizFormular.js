import React, { useState } from 'react';
import './NeueNotizFormular.css';

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
    if (typeof hinzufuegenNotiz === 'function') {
      hinzufuegenNotiz({ titel, inhalt });
      setTitel('');
      setInhalt('');
    }
  };

  return (
    <div>
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
      <div className="container"></div>
    </div>
  );
};

export default NeueNotizFormular;
