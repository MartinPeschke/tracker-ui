'use strict';

var express = require('express');

//Load configurations
//Set the node enviornment variable if not set before
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

//Initializing system variables
var config = require('./config/config');

var app = express();

//express settings
require('./config/express')(app);

//Bootstrap routes
app.get('/', function(req, res) { res.render('index'); });

//Start the app by listening on <port>
var port = process.env.PORT || config.port;
app.listen(port);
console.log('Express app started on port ' + port);

//expose app
exports = module.exports = app;
