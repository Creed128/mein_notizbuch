import React from 'react';

const NotizElement = ({ notiz, bestätigenLöschen }) => {
    const handleLöschen = () => {
        // Hier kannst du die Funktion bestätigenLöschen aufrufen und die Notiz-ID übergeben
        bestätigenLöschen(notiz.id);
    };

    return (
        <div className="notiz-element">
            <h3>{notiz.titel}</h3>
            <p>{notiz.inhalt}</p>
            <button onClick={handleLöschen}>Notiz löschen</button>
        </div>
    );
};

export default NotizElement;