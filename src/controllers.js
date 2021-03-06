'use strict';

let services = require('./services');
let jwt = require('jsonwebtoken');

let signup = (req, res, next) => {
    services.createUser(req.body)
        .then(function(result) {
            let responseBody = {
                id: result._id,
                email: result.email
            };

            res.send(responseBody);
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
    services.checkUser(req.body)
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
    services.report(req.body, req.user)
        .then(function(result) {
            res.send("Habit(s) reported successfully");
        })
        .catch(function(err) {
            res.status(500).send(err);
        });
};

let addHabits = (req, res, next) => {
    services.habits(req.user)
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