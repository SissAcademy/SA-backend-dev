var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;
var api = require('./api.js');
var jwt = require('jsonwebtoken');

// TODO some of the methods here could be extract to different controller files

module.exports = function(router, db) {

    router.post('/signup', function(req, res, next) {
        api.createUser(req.body)
            .then(function(result) {
                res.send(result);
            })
            .catch(function(err) {
                if (err.toJSON().code === 11000){
                    res.status(500).send("This email already exist");
                } else {
                    res.status(500).send(err);
                }
            });
    });

    router.post('/login', function(req, res, next) {
        api.checkUser(req.body)
            .then(function(user){
                if(user){
                    var token = jwt.sign({email: user.email, id: user._id}, 'mypass');
                    return res.json({token: token})
                } else {
                    return next(error);
                }
            })
            .catch(function(error){
                return next(error);
            });

    });

    router.post('/users/report', function (req, res, next) {
        api.report(req.body, req.user)
            .then(function(result) {
                res.send("Habit(s) reported successfully");
            })
            .catch(function(err) {
                res.status(500).send(err);
            });
    });

    router.post('/users/habits', function (req, res, next) {
        api.habits(req.user)
            .then(function(result) {
                res.send(result);
            })
            .catch(function(err) {
                res.status(500).send(err);
            });
    });

};

