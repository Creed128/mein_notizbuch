// NeueNotizFormular.js

import React, { useState } from 'react';
import './NeueNotizFormular.css';

const NeueNotizFormular = ({ hinzufuegenNotiz }) => {
  const [titel, setTitel] = useState('');
  const [inhalt, setInhalt] = useState('');
  const [isPublic, setIsPublic] = useState(true);

  const handleTitelChange = (e) => {
    setTitel(e.target.value);
  };

  const handleInhaltChange = (e) => {
    setInhalt(e.target.value);
  };

  const handleNeueNotiz = () => {
    if (titel && inhalt) {
      const erstellungsdatum = new Date().toLocaleString();
      hinzufuegenNotiz({ id: Date.now(), title: titel, content: inhalt, isPublic: isPublic, erstellungsdatum });
      setTitel('');
      setInhalt('');
      setIsPublic(isPublic);
    }
  };

  return (
    <div className='new-note'>
      <h2>Neue Notiz erstellen</h2>
      <div className="form-group">
        <label className='label' htmlFor="title-input">Titel:</label>
        <input className='input-field' type="text" value={titel} onChange={handleTitelChange} />
      </div>
      <div className="form-group">
        <label className='label' htmlFor="content-input">Inhalt:</label>
        <textarea className='textarea-field' value={inhalt} onChange={handleInhaltChange} placeholder="Schreibe hier deine Notizen..." />
      </div>
      <div className='radios'>
        <div className="radio-group">
          <input type='radio' name='private-public' value={!isPublic} />
          <label className="radio-label" htmlFor="private-public">Privat</label>
        </div>
        <div className="radio-group">
          <input type='radio' name='private-public' value={isPublic} checked />
          <label className="radio-label" htmlFor="private-public">Öffentlich</label>
        </div>
      </div>
      <button className='create-button' onClick={handleNeueNotiz}>Notiz erstellen</button>
    </div>
  );
};

export default NeueNotizFormular;

