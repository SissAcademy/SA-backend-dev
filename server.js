'use strict';

const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const db             = require('./config/database');
const app            = express();
const port           = 5001;
var MongoStore = require('connect-mongo');
let filters = require('./src/filters');
let controllers = require('./src/controllers');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(filters.authentication);

app.post('/signup', controllers.signup);
app.post('/login', controllers.login);
app.post('/users/report', controllers.addReport);
app.post('/users/habits', controllers.addHabits);

MongoClient.connect(db.url, (err, database) => {
    if (err) {
        return console.log(err);
    }

    app.listen(port, () => {
        console.log('We are live on ' + port);
    });
});
