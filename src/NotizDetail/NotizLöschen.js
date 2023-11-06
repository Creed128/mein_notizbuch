import React, { useState, useEffect } from "react";
import deleteNote from "./NotizDetail.js";
import NotizListe from "../Komponenten/NotizListe/NotizListe";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [index, setIndex] = useState(null);

  useEffect(() => {
    // Alle Notizen aus dem DOM auslesen
    const notesFromDOM = document.querySelectorAll(".note");

    // Notizen in ein Array konvertieren
    const notesArray = Array.from(notesFromDOM);

    // Notizen im Zustand speichern
    setNotes(notesArray);
  }, []);

  // Klick-Ereignislistener für den "Speichern"/"Bearbeiten"-Button
  const handleSaveEdit = () => {
    setEditMode(!editMode);
  };

  // Klick-Ereignislistener für Notizen
  const handleNoteClick = (index) => {
    setIndex(index);
  };

  // Klick-Ereignislistener für den "Löschen"-Button
  const handleDelete = () => {
    // Dialogfenster öffnen
    const confirmDelete = window.confirm("Sind Sie sicher, dass Sie die Notiz löschen möchten?");

    // Wenn der Benutzer bestätigt, dann die Notiz löschen
    if (confirmDelete) {
      deleteNote(index);

      // Index auf null setzen
      setIndex(null);
    }
  };

  return (
    <div>
      <h1>Notizen</h1>

      {notes.map((note, i) => (
        <NotizListe
          key={i}
          text={note.text}
          index={i}
          onClick={handleNoteClick}
        />
      ))}

      <button onClick={handleSaveEdit}>
        {editMode ? "Speichern" : "Bearbeiten"}
      </button>

      {editMode && (
        <div>
          <NotizListe
            text={notes[index].textContent}
            index={index}
            onClick={() => setIndex(null)}
          />
          <button onClick={() => setIndex(null)}>Schließen</button>
          <button onClick={handleDelete}>Löschen</button>
        </div>
      )}

      <button onClick={handleNoteClick}>Neue Notiz</button>
    </div>
  );
};

export default App;
