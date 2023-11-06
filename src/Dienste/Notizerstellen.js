import React, { useState } from 'react';
import { Button, Form, Input, Label } from 'react-bootstrap';

const NeueNotizFormular = ({ onNeueNotiz }) => {
  const [titel, setTitel] = useState('');
  const [inhalt, setInhalt] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const neueNotiz = {
      titel,
      inhalt,
    };

    onNeueNotiz(neueNotiz);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Label htmlFor="titel">Titel</Label>
      <Input type="text" id="titel" value={titel} onChange={(e) => setTitel(e.target.value)} />

      <Label htmlFor="inhalt">Inhalt</Label>
      <Input type="text" id="inhalt" value={inhalt} onChange={(e) => setInhalt(e.target.value)} />

      <Button variant="primary" type="submit">Notiz erstellen</Button>
    </Form>
  );
};

export default NeueNotizFormular;
