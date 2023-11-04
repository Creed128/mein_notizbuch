import React from 'react';
import './styles/main.css'; // Hinzugefügte Zeile
import './NotizApp.css'; // Hinzugefügte Zeile
import './NeueNotizFormular.css'; // Hinzugefügte Zeile
import './NotizBearbeitenFormular.css'; // Hinzugefügte Zeile
import './NotizElement.css'; // Hinzugefügte Zeile
import './NotizListe.css'; // Hinzugefügte Zeile
import './NotizDetail.css'; // Hinzugefügte Zeile

import NotizListe from './Komponenten/NotizListe/NotizListe';
import NeueNotizFormular from './Komponenten/NotizFormular/NeueNotizFormular';

const App = () => {
  const [notizen, setNotizen] = React.useState([
    { id: 1, title: 'Notiz 1', content: 'Inhalt von Notiz 1' },
    { id: 2, title: 'Notiz 2', content: 'Inhalt von Notiz 2' },
    { id: 3, title: 'Notiz 3', content: 'Inhalt von Notiz 3' }
    // ... andere Notizen
  ]);

  const handleNeueNotiz = (neueNotiz) => {
    setNotizen([...notizen, neueNotiz]);
  };

  return (
    <div>
      <h1>Mein Notizbuch App</h1>
      <NeueNotizFormular onNeueNotiz={handleNeueNotiz} />
      <NotizListe notizen={notizen} />
    </div>
  );
};

export default App;
