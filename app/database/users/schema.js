var mongoose = require('mongoose');
var User = new mongoose.Schema({
    username : {
        type: String
    },
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

module.exports = mongoose.model('User', User);