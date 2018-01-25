const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const db             = require('./config/database');
const app            = express();
const port = 5001;
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);


app.use(bodyParser.urlencoded({ extended: true }));
MongoClient.connect(db.url, (err, database) => {
    if (err) return console.log(err);
    require('./app/routes/index.js')(app, database.db('node-project'));
    app.listen(port, () => {
        console.log('We are live on ' + port);
    });
});


app.use(session({
    secret: 'i need more beers',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
        url: db.url,
    })
}));