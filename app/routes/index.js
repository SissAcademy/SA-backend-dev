// routes/index.js
const RoutesUsers = require('../database/users/routes.js');
module.exports = function(app, db) {
    RoutesUsers(app, db);
};