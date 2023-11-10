const NeueNotizFormular = ({ hinzufuegenNotiz }) => {

  const handleNeueNotiz = () => {
    if (document.getElementById("title-input") !== "" && document.getElementById("editor").innerHTML !== "") {
      const erstellungsdatum = new Date().toLocaleString();
      hinzufuegenNotiz({ id: Date.now(), title: document.getElementById("title-input").value, content: document.getElementById("editor").innerHTML, erstellungsdatum });
      document.getElementById("editor").innerHTML = ""
      document.getElementById("title-input").value = ""    
    }
  };

  const handleBold = () => {
    document.execCommand('bold', false, null);
  }

  const handleItalic = () => {
    document.execCommand('italic', false, null);
  }

  const handleUnderline = () => {
    document.execCommand('underline', false, null);
  }

  return (
    <div className='new-note'>
      <h2>Neue Notiz erstellen</h2>
      <label className='title' for="title-input">Titel:</label>
      <input className='title-input' id="title-input" type="text" />
      <div>
        <div>
          <button onClick={handleBold} id="bold-button"><b>B</b></button>
          <button onClick={handleItalic} id="italic-button"><i>I</i></button>
          <button onClick={handleUnderline} id="underline-button"><u>U</u></button>
        </div>
        <label className='content' for="content-input">Inhalt:</label>
        <div contentEditable className='content-input' id="editor"></div>
      </div>

      <button className='create-button' onClick={handleNeueNotiz}>Notiz erstellen</button>
    </div>
  );
};

export default NeueNotizFormular;
