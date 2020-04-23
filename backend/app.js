const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const api = require('./routes');

const app = express();

mongoose.connect('mongodb://localhost/tech4good')
    .then(() => {
        console.log("Mongo Connected");
    })
    .catch((err) => {
        console.log('Mongo Error', err);
    });

app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }));
// Point static path to dist
app.use(express.static(path.join(__dirname, '../dist')));
app.use('/api', api);
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});
module.exports = app;
