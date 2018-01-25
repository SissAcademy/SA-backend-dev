var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;
var api = require('./api.js');

module.exports = function(router, db)
{
    router.post('/login', function(req, res, next) {
        if (req.session.user) return res.redirect('/');

        api.checkUser(req.body)
            .then(function(user){
                if(user){
                    req.session.user = {id: user._id, username: user.username};
                    res.send('login successful')
                } else {
                    return next(error)
                }
            })
            .catch(function(error){
                return next(error)
            })

    });

    router.post('/users/create', function(req, res, next) {

        api.createUser(req.body)
            .then(function(result)
            {
                res.send(result);
                console.log("User created")
            })
            .catch(function(err){
                console.log('hi');
                res.send(err);
                if (err.toJSON().code === 11000){
                    res.status(500).send("This email already exist")
                }
            })
    });

    router.post('/logout', function(req, res, next) {
        if (req.session.user) {
            delete req.session.user;
            res.send('logout successful')
        }
    });

    router.post('/ping', function(req, res, next) {
        console.log('ping');
        res.send('ping yes')
    });
}

