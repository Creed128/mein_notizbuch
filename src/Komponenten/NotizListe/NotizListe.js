// src/Komponenten/NotizListe/NotizListe.js

import React from 'react';
import './NotizListe.css'; // Stellen Sie sicher, dass der Pfad zur CSS-Datei korrekt ist

const NotizListe = ({ notes }) => {
  return (
    <div>
      {notes.map((note) => (
        <div className="notiz-element" key={note.id}>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
        </div>
      ))}
    </div>
  );
};

export default NotizListe;
