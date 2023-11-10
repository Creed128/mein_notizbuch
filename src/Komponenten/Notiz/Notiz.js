import React, { useState } from 'react';

const Notiz = ({ notiz, bearbeiteNotiz, loescheNotiz, edit }) => {
  const [showPopup, setShowPopup] = useState(false);
  var editing = edit;
  console.log(editing)

  const handleBearbeitenClick = () => {
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const handleBearbeitenSubmit = (updatedNotiz) => {
    bearbeiteNotiz(notiz.id, updatedNotiz);
    setShowPopup(false);
  };

  return (
    <div className="notiz">
      <h3>{notiz.title}</h3>
      <p dangerouslySetInnerHTML={{__html: notiz.content}}></p>
      <p>Erstellungsdatum: {notiz.erstellungsdatum}</p>
      <button onClick={handleBearbeitenClick}>Bearbeiten</button>
      <button onClick={() => loescheNotiz(notiz.id)}>Löschen</button>

      {showPopup && (
        <Popup
          notiz={notiz}
          onClose={handlePopupClose}
          onSubmit={handleBearbeitenSubmit}
        />
      )}
    </div>
  );
};

const Popup = ({ notiz, onClose, onSubmit }) => {
  const [updatedNotiz, setUpdatedNotiz] = useState({ title: '', content: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedNotiz((prevNotiz) => ({
      ...prevNotiz,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    onSubmit(updatedNotiz);
  };

  return (
    <div className="popup">
      <h3>Bearbeiten</h3>
      <input
        placeholder={notiz.title}
        type="text"
        name="title"
        value={updatedNotiz.title}
        onChange={handleInputChange}
      />
      <textarea
        placeholder={notiz.content}
        name="content"
        value={updatedNotiz.content}
        onChange={handleInputChange}
      />
      <button onClick={handleSubmit}>Speichern</button>
      <button onClick={onClose}>Abbrechen</button>
    </div>
  );
};

export default Notiz;