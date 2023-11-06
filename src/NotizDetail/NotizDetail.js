import React from 'react';
import './NotizDetail.css';


const NotizDetail = ({ notiz }) => {
  return (
    <div>
      <h2>Notiz Detail</h2>
      {notiz ? (
        <div>
          <h3>{notiz.titel}</h3>
          <p>{notiz.inhalt}</p>
        </div>
      ) : (
        <p>Keine Notiz ausgewählt.</p>
      )}
    </div>
  );
};

export default NotizDetail;