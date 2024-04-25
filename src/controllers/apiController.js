var bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
var NotizModel = require('../models/notizModel');

module.exports = function (app, cache) {

    // Diese Zeile stellt die API ein, dass die Requests(Anfragen) und Responses(Antworten) das JSON-Format verwenden
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    // Diese GET-Methode gibt uns alle ToDos aus dem NodeCache zurück
    app.get('/api/note/all', function (req, res) {

        var ids = cache.keys();
        var notes = cache.mget(ids);

        res.send(notes);
    });

    // Erstellung eines Todos und Speichern im NodeCache
    app.post('/api/note', function (req, res) {

        var id = uuidv4();
        var description = req.body.description;
        var completed = req.body.completed;

        var note = new NotizModel(id, description, completed);

        cache.set(id, note);

        res.send(note);
    });

    // Abholung eines ToDos durch seine Id
    app.get('/api/note', function (req, res) {

        var id = req.query.id;
        console.log(id)
        var note = cache.get(id);

        res.send(note);
    });

    // Aktualisierung eines ToDos
    app.put('/api/note/:id', function (req, res) {

        var id = req.params.id;
        var note = cache.take(id);
        note.description = req.body.description;
        note.completed = req.body.completed;

        cache.set(id, note);

        res.send(note);
    });

    // Löschung eines ToDos
    app.delete('/api/note/:id', function (req, res) {

        var id = req.params.id;
        cache.del(id);
        
        res.send();
    });
};