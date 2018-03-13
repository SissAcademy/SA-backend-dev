var crypto = require('crypto');
var mongoose = require("mongoose");
const db = require('../../../config/database');
var dbMongoose = mongoose.connect(db.url);
var models = require('./schema');

exports.createUser = function(userData){
    var user = {
        email: userData.email,
        password: hash(userData.password)
    };
    var newUser = new models.User(user);
    return newUser.save();
};

exports.checkUser = function(userData) {
    return models.User.findOne({email: userData.email})
        .then(function(doc){
            if (doc != null && doc.password === hash(userData.password)) {
                return Promise.resolve(doc);
            } else {
                return Promise.reject("Invalid email or password");
            }
        });
};

exports.report  = function(userData, user) {
    var habit = {
        group: userData.group,
        subgroup: userData.subgroup,
        option: userData.option,
        day: userData.day,
        user: user.id
    };
    var newHabit = new models.Habit(habit);
    return newHabit.save();
};

exports.habits  = function(user) {
    return models.Habit.find({user: user.id})
        .then(function(doc) {
            return Promise.resolve(doc);
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