import React, { useState } from 'react';
import './search.css';

function Search() {
  const [searchInput, setSearchInput] = useState('');
  const [notes, setNotes] = useState(['Notiz 1', 'Notiz 2', 'Notiz 3']);
  const [filteredNotes, setFilteredNotes] = useState(notes); // Hier speichern wir eine Kopie der Notizen

  const handleSearch = () => {
    const lowercaseSearchInput = searchInput.toLowerCase();
    const filteredNotes = notes.filter((note) =>
      note.toLowerCase().includes(lowercaseSearchInput)
    );
    // Aktualisiere den State, um die gefilterten Notizen zu speichern
    setFilteredNotes(filteredNotes);
  };

  return (
    <div className="search-box">
      <input
        type="text"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder="Suche..."
      />
      <button onClick={handleSearch}>Suchen</button>
      <ul id="note-list">
        {filteredNotes.map((note, index) => (
          <li key={index}>{note}</li>
        ))}
      </ul>
    </div>
  );
}

export default Search;
