import React from 'react';
// Die NotizElement-Komponente rendert ein einzelnes Element einer Notiz.
// Sie erhält die Notizdaten (Titel und Inhalt) sowie Funktionen zum Bearbeiten und Löschen der Notiz als Props.

const NotizElement = ({ notiz, bearbeiteNotiz, loescheNotiz }) => {
  return (
    <div className="notiz-element">
      <h3>{notiz.title}</h3>
      <div dangerouslySetInnerHTML={notiz.content}></div>
      <button onClick={() => bearbeiteNotiz(notiz.id, { title: 'Neuer Titel', content: 'Neuer Inhalt' })}>
        Bearbeiten
      </button>
      <button onClick={() => loescheNotiz(notiz.id)}>Löschen</button>
    </div>
  );
};



export default NotizElement;
