// src/App.js
import React from 'react';
import NeueNotizFormular from './Komponenten/NotizFormular/NeueNotizFormular';
import NotizListe from './Komponenten/NotizListe/NotizListe';

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Mein Notizbuch App</h1>
        <NeueNotizFormular />
        <NotizListe />
        {/* Weitere Komponenten hier einbinden */}
      </div>
    );
  }
}

export default App;
