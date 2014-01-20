'use strict';

var path = require('path'),
    rootPath = path.normalize(__dirname + '/../..');

module.exports = {
    root: rootPath,
    port: process.env.PORT || 3000,
    sessionSecret: 'MEAN',
    api: 'http://bizintell.cloudapp.net:12345',
    apiClientToken: '1234asdf23t523f5ya'
}
