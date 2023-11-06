import React from 'react';
import './styles/main.css';
import NotizListe from './Komponenten/NotizListe/NotizListe';
import NeueNotizFormular from './Komponenten/NotizFormular/NeueNotizFormular';

const App = () => {
  const notizDienst = NotizDienst();

  const handleNeueNotiz = (neueNotiz) => {
    notizDienst.hinzufuegenNotiz(neueNotiz);
  };

  const handleBestätigenLöschen = (id) => {
    notizDienst.loeschenNotiz(id);
  };

  return (
    <div>
      <h1>Mein Notizbuch App</h1>

    </div>
  );
};

export default App;