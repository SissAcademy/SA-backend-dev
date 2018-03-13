var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
    email : {
        type: String,
        unique: true,
        required: true
    },
    password : {
        type: String,
        required: true
    }
});
var User = mongoose.model('User', userSchema);

var habitSchema = new mongoose.Schema({
    group : {
        type: String
    },
    subgroup : {
        type: String
    },
    option : {
        type: String,
        enum: [
            'done',
            'partly-done',
            'empty',
            'missed',
            'failed',
            'denied'
        ]
    },
    day : Date,
    user : String
});
var Habit = mongoose.model('Habit', habitSchema);

module.exports = {
    User : User,
    Habit : Habit
};