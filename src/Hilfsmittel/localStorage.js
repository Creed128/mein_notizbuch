// src/Hilfsmittel/localStorage.js

// Funktion zum Speichern von Daten im localStorage
export const speichernImLocalStorage = (schlüssel, wert) => {
    localStorage.setItem(schlüssel, JSON.stringify(wert));
  };
  
  // Funktion zum Abrufen von Daten aus dem localStorage
  export const abrufenAusLocalStorage = (schlüssel) => {
    const gespeicherterWert = localStorage.getItem(schlüssel);
    return gespeicherterWert ? JSON.parse(gespeicherterWert) : null;
  };
  
  // Funktion zum Löschen von Daten aus dem localStorage
  export const löschenAusLocalStorage = (schlüssel) => {
    localStorage.removeItem(schlüssel);
  };
  