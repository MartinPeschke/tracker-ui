'use strict';

var express = require('express'),
    httpProxy = require('http-proxy'),
    apiProxy = httpProxy.createProxyServer({}),
    fs = require('fs'),
    config = {
        apiUrl: 'http://bizintell.cloudapp.net:12345',
        apiClientToken: '1234asdf23t523f5ya'
    };

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.PORT = process.env.PORT || 3000;

var app = express();

app.use('/api', function(req, res) {
    req.headers['Client-Token'] = config.apiClientToken;
    apiProxy.web(req, res, { target: config.apiUrl });
});
app.use(express.static(__dirname + '/public'));
app.use('/', function(req, res) {
    fs.readFile(__dirname + '/public/index.html', 'utf8', function(err, text){
        res.send(text);
    });
});


app.listen(process.env.PORT);
console.log('Express app started on port ' + process.env.PORT);
exports = module.exports = app;
