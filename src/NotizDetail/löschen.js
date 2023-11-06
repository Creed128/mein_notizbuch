// lösch-funktion.js

function deleteNote(index) {
    // Notiz aus dem Zustand entfernen
    const notes = [...notes].filter((note) => note.index !== index);
    setNotes(notes);
  
    // Notiz aus dem DOM entfernen
    const noteElement = document.querySelector(`.note[data-index="${index}"]`);
    noteElement.remove();
  }
  
  export default deleteNote;
  