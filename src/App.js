// src/App.js

import React from 'react';
import './styles/main.css';
import NotizListe from './Komponenten/NotizListe/NotizListe';

const App = () => {
  const mockNotes = [
    { id: 1, title: 'Notiz 1', content: 'Inhalt von Notiz 1' },
    { id: 2, title: 'Notiz 2', content: 'Inhalt von Notiz 2' },
    // ... andere Notizen
  ];

  return (
    <div>
      <h1>Mein Notizbuch App</h1>
      <NotizListe notes={mockNotes} />
    </div>
  );
};

export default App;
