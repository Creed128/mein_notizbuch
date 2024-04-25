const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb+srv://konstantinkirsch:DtDuynufFv3IwPLu@clusternotizbuch.wx9b4g9.mongodb.net/retryWrites=true&w=majority&appName=ClusterNotizbuch', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Successfully connected to mongodb'))
    .catch(error => console.error(error));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});