'use strict';

let api = require('../app/database/users/api');
let jwt = require('jsonwebtoken');

let signup = (req, res, next) => {
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
};

let login = (req, res, next) => {
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
};

let addReport = (req, res, next) => {
    api.report(req.body, req.user)
        .then(function(result) {
            res.send("Habit(s) reported successfully");
        })
        .catch(function(err) {
            res.status(500).send(err);
        });
};

let addHabits = (req, res, next) => {
    api.habits(req.user)
        .then(function(result) {
            res.send(result);
        })
        .catch(function(err) {
            res.status(500).send(err);
        });
};

module.exports = {
    signup: signup,
    login: login,
    addReport: addReport,
    addHabits: addHabits
};