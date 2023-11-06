import React from 'react';
import './styles/main.css';
import NotizListe from './Komponenten/NotizListe/NotizListe';
import NeueNotizFormular from './Komponenten/NotizFormular/NeueNotizFormular';
import NotizDienst from './Dienste/NotizDienst.js';

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
      <NeueNotizFormular hinzufuegenNotiz={handleNeueNotiz} />
      <NotizListe notizen={notizDienst.notizen} bestätigenLöschen={handleBestätigenLöschen} />
    </div>
  );
};

export default App;
