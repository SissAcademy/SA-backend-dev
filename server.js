'use strict';

const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
let configuration = require('./src/configuration');
const app            = express();
const port           = 5001;
var MongoStore = require('connect-mongo');
let filters = require('./src/filters');
let controllers = require('./src/controllers');
let mongoose = require("mongoose");
let dbMongoose = mongoose.connect(configuration.getDbUrl());
let routes = require('./src/routes');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(filters.authentication);
app.use('/', routes);

var swaggerJSDoc = require('swagger-jsdoc');

var options = {
  swaggerDefinition: {
    info: {
      title: 'Sissy Academy API', // Title (required)
      version: '0.0.1', // Version (required)
    },
    host: 'localhost:5001',
    basePath: '/'
  },
  apis: ['./src/routes.js', './api-doc/definitions.yaml'], // Path to the API docs
};

// Initialize swagger-jsdoc -> returns validated swagger spec in json format
var swaggerSpec = swaggerJSDoc(options);

const swaggerUi = require('swagger-ui-express');
 
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// serve swagger
app.get('/swagger.json', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

MongoClient.connect(configuration.getDbUrl(), (err, database) => {
    if (err) {
        return console.log(err);
    }

    app.listen(port, () => {
        console.log('We are live on ' + port);
    });
});

