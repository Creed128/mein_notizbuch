// Notiz.js
import React from 'react';

const Notiz = ({ notiz, bearbeiteNotiz, loescheNotiz }) => {
  const handleBearbeiten = () => {
    const neuerTitel = prompt('Geben Sie den neuen Titel ein:');
    const neuerInhalt = prompt('Geben Sie den neuen Inhalt ein:');

    if (neuerTitel !== null && neuerInhalt !== null) {
      bearbeiteNotiz(notiz.id, { title: neuerTitel, content: neuerInhalt });
    }
  };

  return (
    <div className="notiz-element">
      <h3>{notiz.title}</h3>
      <p>{notiz.content}</p>
      <button className="bearbeiten-button" onClick={handleBearbeiten}>
        Bearbeiten
      </button>
      <button onClick={() => loescheNotiz(notiz.id)}>Löschen</button>
    </div>
  );
};

export default Notiz;
