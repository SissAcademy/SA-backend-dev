var crypto = require('crypto');
var mongoose = require("mongoose");
const db = require('../../../config/database');
var dbMongoose = mongoose.connect(db.url);
var User = require('./schema');

exports.createUser = function(userData){
    var user = {
        username: userData.username,
        email: userData.email,
        password: hash(userData.password)
    };
    let newUser = new User(user);
    newUser.save();
    console.log(newUser);
    return newUser.save();
}

exports.getUser = function(id) {
    return User.findOne(id)
}

exports.checkUser = function(userData) {
    return User.findOne({email: userData.email})
            .then(function(doc){
                if ( doc.password === hash(userData.password) )
                {
                    console.log("User password is ok");
                    return Promise.resolve(doc)
                }
                else
                {
                    return Promise.reject("Error wrong")
                }
            })
}

function hash(text) {
    return crypto.createHash('sha1')
        .update(text).digest('base64')
}