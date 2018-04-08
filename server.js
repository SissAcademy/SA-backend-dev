'use strict';

const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const db             = require('./config/database');
const app            = express();
const port           = 5001;
var MongoStore = require('connect-mongo');
var jwt = require('jsonwebtoken');
let filters = require('./src/filters');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(filters.authentication);

MongoClient.connect(db.url, (err, database) => {
    if (err) {
        return console.log(err);
    }

    require('./app/routes/index.js')(app, database.db('node-project'));

    app.listen(port, () => {
        console.log('We are live on ' + port);
    });
});
