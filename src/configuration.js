'use strict';

let os = require('os');
let fs = require('fs');

let configurationFile = os.homedir() + '/.sissacademy.json';
let configuration =  JSON.parse(fs.readFileSync(configurationFile, 'utf8'));

module.exports = {
    getDbUrl: () => configuration.db.path
}