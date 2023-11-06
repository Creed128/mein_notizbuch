import React, { useState, useEffect } from "react";

const Note = ({ text }) => {
  return (
    <div className="note">
      <p>{text}</p>
    </div>
  );
};

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

  // Funktion zum Erstellen von Notizen
  const handleAddNote = () => {
    // Neue Notiz erstellen
    const newNote = {
      text: "",
      index: notes.length,
    };

    // Notiz dem Zustand hinzufügen
    setNotes((notes) => [...notes, newNote]);

    // Notiz im DOM rendern
    const noteElement = document.createElement("div");
    noteElement.classList.add("note");
    noteElement.innerHTML = `<p>Neue Notiz</p>`;
    noteElement.addEventListener("click", handleNoteClick);
    document.querySelector(".notes").appendChild(noteElement);
  };

  return (
    <div>
      <h1>Notizen</h1>

      {notes.map((note, i) => (
        <Note
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
          <Note
            text={notes[index].textContent}
            index={index}
            onClick={() => setIndex(null)}
          />
          <button onClick={() => setIndex(null)}>Schließen</button>
        </div>
      )}

      <button onClick={handleAddNote}>Neue Notiz</button>
    </div>
  );
};

export default App;
