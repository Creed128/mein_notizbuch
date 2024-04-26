// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// Es wird Express.js mit Node.js verwendet. Mehr Info unter: https://expressjs.com/de/
var express = require('express'); 
var app = express();

// wir speicher zuerst die ToDos im Arbeitsspeicher https://www.npmjs.com/package/node-cache. Später werden wir das in eine Datenbank umwandeln.
const NodeCache = require( "node-cache" );

// Eine Referenz zu der Datei im controllers-Ordner
var apiController = require('./controllers/apiController');

// process.env.PORT || 3000 erlaubt uns, den Port als Environment-Variable einzureichen. Wenn kein Port eingereicht wird, wird der Port 3000 verwendet
var port  = process.env.PORT || 3000;

// Erstellung vom Speicher-Objekt im Arbeitsspeicher
var cache = new NodeCache();

// Initalizierung des appController und Übergabe von app- und cache-Instanzen
apiController(app, cache);

// Die API wird am definierten Port gestartet
app.listen(port);