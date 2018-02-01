var crypto = require('crypto');
var mongoose = require("mongoose");
const db = require('../../../config/database');
var dbMongoose = mongoose.connect(db.url);
var User = require('./schema');

exports.createUser = function(userData){
    var user = {
        email: userData.email,
        password: hash(userData.password)
    };
    var newUser = new User(user);
    return newUser.save();
};

exports.getUser = function(id) {
    return User.findOne(id);
};

exports.checkUser = function(userData) {
    return User.findOne({email: userData.email})
        .then(function(doc){
            if (doc != null && doc.password === hash(userData.password)) {
                return Promise.resolve(doc);
            } else {
                return Promise.reject("Invalid email or password");
            }
        });
};

function hash(text) {
    if (text == null) {
        return null;
    } else {
        return crypto.createHash('sha1')
            .update(text).digest('base64');
    }
}