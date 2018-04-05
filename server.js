'use strict';

const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const db             = require('./config/database');
const app            = express();
const port           = 5001;
var MongoStore = require('connect-mongo');
var jwt = require('jsonwebtoken');

MongoClient.connect(db.url, function(err, database) {
    if (err) return console.log(err);
    require('./app/routes/index.js')(app, database.db('node-project'));
    app.listen(port, function() {
        console.log('We are live on ' + port);
    });
});

app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
    var unsecurePaths = ['/login', '/signup'];
    if (unsecurePaths.includes(req.originalUrl)) {
        next()
    } else {
        if (req. headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
            jwt.verify(req.headers.authorization.split(' ')[1], 'mypass', function(err, decode) {
                if (err) {
                    res.status(403).send("Invalid user");
                }
                req.user = decode;
                next();
            });
        } else {
            res.status(403).send("Invalid user");
        }
    }
});