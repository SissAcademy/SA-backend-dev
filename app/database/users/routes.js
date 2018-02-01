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
};

