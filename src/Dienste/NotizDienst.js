import React, { useState } from 'react';
import './NotizDienst.css'

function NotizDienst() {
  // React-Zustand, um Notizen zu speichern
  const [notizen, setNotizen] = useState([]);

  // Funktion zum Hinzufügen einer neuen Notiz
  const hinzufuegenNotiz = (neueNotiz) => {
    setNotizen([...notizen, neueNotiz]);
  };

  // Aktualisieren von Notiz
  const aktualisierenNotiz = (id, aktualisierteNotiz) => {
    // Logik zum Aktualisieren der Notiz
    const aktualisierteNotizen = notizen.map((notiz) =>
      notiz.id === id ? aktualisierteNotiz : notiz
    );
    setNotizen(aktualisierteNotizen);
  };

  // Funktion zum Löschen einer Notiz
  const loeschenNotiz = (id) => {
    // Logik zum Löschen der Notiz
    const neueNotizen = notizen.filter((notiz) => notiz.id !== id);
    setNotizen(neueNotizen);
  };

  // Funktion zum Abrufen einer bestimmten Notiz anhand der ID
  const getNotizById = (id) => {
    return notizen.find((notiz) => notiz.id === id);
  };

  // Funktion zum Abrufen aller Notizen
  const getAlleNotizen = () => {
    return notizen;
  };

  // Funktion zum Überprüfen, ob eine Notiz existiert, anhand der ID
  const notizExistiert = (id) => {
    return notizen.some((notiz) => notiz.id === id);
  };

  // Funktionen und Daten zurück
  return {
    notizen,
    hinzufuegenNotiz,
    aktualisierenNotiz,
    loeschenNotiz,
    getNotizById,
    getAlleNotizen,
    notizExistiert,
  };
}

export default NotizDienst;
