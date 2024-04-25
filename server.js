const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Successfully connected to mongodb'))
    .catch(error => console.error(error));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});