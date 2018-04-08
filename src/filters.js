'use strict';

let jwt = require('jsonwebtoken');
let pathValidator = require('./tools/urlPathValidator');

function authentication(req, res, next) {
    var unsecurePaths = ['/login', '/signup', '/swagger.json', '/api-docs.*'];
    if (pathValidator.with(unsecurePaths).accepts(req.originalUrl)) {
        next()
    } else {
        if (req. headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
            jwt.verify(req.headers.authorization.split(' ')[1], 'mypass', function(err, decode) {
                if (err) {
                    res.status(403).send("Invalid user");
                }
                req.user = decode;
                next();
            });
        } else {
            res.status(403).send("Invalid user for resorce " + req.originalUrl);
        }
    }
}

module.exports = { 
    authentication: authentication
};