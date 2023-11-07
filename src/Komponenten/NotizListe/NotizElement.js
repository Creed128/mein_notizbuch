import React from 'react';

const NotizElement = ({ notiz, bearbeiteNotiz, loescheNotiz }) => {
  return (
    <div className="notiz-element">
      <h3>{notiz.title}</h3>
      <p>{notiz.content}</p>
      <button onClick={() => bearbeiteNotiz(notiz.id, { title: 'Neuer Titel', content: 'Neuer Inhalt' })}>
        Bearbeiten
      </button>
      <button onClick={() => loescheNotiz(notiz.id)}>Löschen</button>
    </div>
  );
};

export default NotizElement;