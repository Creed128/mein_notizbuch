var bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
var TodoModel = require('../models/todoModel');

module.exports = function (app, cache) {

    // Diese Zeile stellt die API ein, dass die Requests(Anfragen) und Responses(Antworten) das JSON-Format verwenden
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    // Diese GET-Methode gibt uns alle ToDos aus dem NodeCache zurück
    app.get('/api/todo/all', function (req, res) {

        var ids = cache.keys();
        var todos = cache.mget(ids);

        res.send(todos);
    });

    // Erstellung eines Todos und Speichern im NodeCache
    app.post('/api/todo', function (req, res) {

        var id = uuidv4();
        var description = req.body.description;
        var completed = req.body.completed;

        var todo = new TodoModel(id, description, completed);

        cache.set(id, todo);

        res.send(todo);
    });

    // Abholung eines ToDos durch seine Id
    app.get('/api/todo', function (req, res) {

        var id = req.query.id;
        console.log(id)
        var todo = cache.get(id);

        res.send(todo);
    });

    // Aktualisierung eines ToDos
    app.put('/api/todo/:id', function (req, res) {

        var id = req.params.id;
        var todo = cache.take(id);
        todo.description = req.body.description;
        todo.completed = req.body.completed;

        cache.set(id, todo);

        res.send(todo);
    });

    // Löschung eines ToDos
    app.delete('/api/todo/:id', function (req, res) {

        var id = req.params.id;
        cache.del(id);
        
        res.send();
    });
};