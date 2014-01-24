var http = require('http'),
    config = require('../config/config'),
    request = require('request');


var make_url = function(path){
    return config.api + path;
};


exports.post = function(path, data, next){
    var options =  {
        method: "POST",
        url: make_url(path),
        json: data,
        headers: {
            'Client-Token': config.apiClientToken
        }
    };
    console.log('REQUEST: ', JSON.stringify(options));
    request(options, function callback(error, response, body){
        console.log('RESPONSE: ', JSON.stringify(body));
        if (!error && response.statusCode == 200) {
            next(error, body);
        }
    });
};