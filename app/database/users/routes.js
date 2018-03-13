var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;
var api = require('./api.js');

module.exports = function(router, db) {
    router.post('/login', function(req, res, next) {
        if (req.session.user) return res.redirect('/');

        api.checkUser(req.body)
            .then(function(user){
                if(user){
                    req.session.user = {id: user._id, email: user.email};
                    res.send("Login successful");
                } else {
                    return next(error);
                }
            })
            .catch(function(error){
                return next(error);
            });

    });

    router.post('/users/create', function(req, res, next) {
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

    router.post('/logout', function(req, res, next) {
        if (req.session.user) {
            delete req.session.user;
            res.send("Logout successful");
        } else {
            res.status(500).send("No user logged in");
        }
    });

    router.post('/users/report', function (req, res, next) {
        if (req.session.user) {
            api.report(req.body, req.session.user)
                .then(function(result) {
                    res.send("Habit(s) reported successfully");
                })
                .catch(function(err) {
                    res.status(500).send(err);
                })
        } else {
            res.status(403).send("No user logged in");
        }
    });

    router.post('/users/habits', function (req, res, next) {
        if (req.session.user) {
            api.habits(req.session.user)
                .then(function(result) {
                    res.send(result);
                })
                .catch(function(err) {
                    res.status(500).send(err);
                })
        } else {
            res.status(403).send("No user logged in");
        }
    })
};

