import React from 'react';
import Notiz from '../Notiz/Notiz';

const NotizListe = ({ notizen, bearbeiteNotiz, loescheNotiz, benutzerVerbunden }) => {
  const filterNachSichtbarkeit = (notiz) => {
    switch (benutzerVerbunden.isConnected) {
      case true:
        switch (notiz.isPublic) {
          case true:
            return true; // Afficher les notes publiques pour l'utilisateur connecté
          case false:
            return notiz.owner === benutzerVerbunden.username; // Afficher les notes privées de l'utilisateur connecté
          default:
            return false;
        }
      case false:
        return notiz.isPublic; // Afficher uniquement les notes publiques pour les utilisateurs non connectés
      default:
        return false;
    }
  };

  return (
    <div className="notiz-liste">
      {notizen
        .filter(filterNachSichtbarkeit)
        .map((notiz) => (
          <Notiz
            key={notiz.id}
            notiz={notiz}
            bearbeiteNotiz={bearbeiteNotiz}
            loescheNotiz={loescheNotiz}
          />
        ))}
    </div>
  );
};

export default NotizListe;
