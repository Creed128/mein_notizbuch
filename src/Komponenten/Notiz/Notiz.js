import React from 'react';

// Komponente "Notiz"
const Notiz = ({ notiz, bearbeiteNotiz, loescheNotiz }) => {
  // Funktion zum Bearbeiten der Notiz
  const handleBearbeiten = () => {
    // Dialog zur Eingabe des neuen Titels
    const neuerTitel = prompt('Geben Sie den neuen Titel ein:');
    // Dialog zur Eingabe des neuen Inhalts
    const neuerInhalt = prompt('Geben Sie den neuen Inhalt ein:');

    // Überprüfen, ob Titel und Inhalt nicht null sind
    if (neuerTitel !== null && neuerInhalt !== null) {
      // Aufruf der bearbeiteNotiz-Funktion mit der Notiz-ID und den neuen Daten
      bearbeiteNotiz(notiz.id, { title: neuerTitel, content: neuerInhalt });
    }
  };

  return (
    <div className="notiz-element">
      <h3>{notiz.title}</h3>
      <p>{notiz.content}</p>
      <p>{`Erstellt am: ${notiz.erstellungsdatum}`}</p>
      <button className="bearbeiten-button" onClick={handleBearbeiten}>
        Bearbeiten
      </button>
      <button onClick={() => loescheNotiz(notiz.id)}>Löschen</button>
    </div>
  );
};

// Export der Notiz-Komponente
export default Notiz;