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
    // Call the hinzufuegenNotiz function and pass the new note data
    hinzufuegenNotiz({ titel, inhalt });
    // Reset the input fields
    setTitel('');
    setInhalt('');
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
      <div className="container">
      </div>
    </div>
  );
};

export default NeueNotizFormular;
