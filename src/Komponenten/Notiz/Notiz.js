import React from 'react';

const Notiz = ({ notiz, bearbeiteNotiz, loescheNotiz }) => {
  return (
    <div className="notiz">
      <h3>{notiz.title}</h3>
      <p>{notiz.content}</p>
      <p>Erstellungsdatum: {notiz.erstellungsdatum}</p>
      <button onClick={() => bearbeiteNotiz(notiz.id)}>Bearbeiten</button>
      <button onClick={() => loescheNotiz(notiz.id)}>Löschen</button>
    </div>
  );
};

export default Notiz;
