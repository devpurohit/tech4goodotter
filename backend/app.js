const express = require('express');
const cors = require('cors');
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
app.use(bodyParser.json());
app.use('/api', api);
module.exports = app;
