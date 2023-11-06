// Importieren Sie alle erforderlichen Abhängigkeiten

// eine Funktion oder ein Hook für den Notizdienst
function NotizDienst() {
  // React-Zustand, um Notizen zu speichern
  const [notizen, setNotizen] = useState([]);

  // Funktion zum Hinzufügen einer neuen Notiz
  const hinzufuegenNotiz = (neueNotiz) => {
    setNotizen([...notizen, neueNotiz]);
  };

  // Aktualisieren von Notiz
  const aktualisierenNotiz = (id, aktualisierteNotiz) => {
    const aktualisierteNotizen = notizen.map((notiz) =>
      notiz.id === id ? { ...notiz, ...aktualisierteNotiz } : notiz
    );
    setNotizen(aktualisierteNotizen);
  };

  // Funktion zum Löschen einer Notiz
  const loeschenNotiz = (id) => {
    const aktualisierteNotizen = notizen.filter((notiz) => notiz.id !== id);
    setNotizen(aktualisierteNotizen);
  };

  // Funktionen und Daten zurück
  return {
    notizen,
    hinzufuegenNotiz,
    aktualisierenNotiz,
    loeschenNotiz,
  };
}

// Export in anderen Komponenten
export default NotizDienst;
