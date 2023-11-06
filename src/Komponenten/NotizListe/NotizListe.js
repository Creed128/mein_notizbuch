import React from 'react';
import './NotizListe.css';
import NotizElement from './NotizElement';

const NotizListe = ({ notizen, bestätigenLöschen }) => {
  return (
    <div>
      <h2>Notizliste</h2>
      {notizen.map((notiz) => (
        <NotizElement key={notiz.id} notiz={notiz} bestätigenLöschen={bestätigenLöschen} />
      ))}
    </div>
  );
};

export default NotizListe;
