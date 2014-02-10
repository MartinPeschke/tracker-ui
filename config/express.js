'use strict';

/**
 * Module dependencies.
 */
var express = require('express'),
    config = require('./config'),
    httpProxy = require('http-proxy'),
    apiProxy = httpProxy.createProxyServer({});

module.exports = function(app) {
    app.set('showStackError', true);
    app.use('/api', function(req, res) {
        req.headers['Client-Token'] = config.apiClientToken;
        apiProxy.web(req, res, { target: 'http://bizintell.cloudapp.net:12345' });
    });

    // Prettify HTML
    app.locals.pretty = true;

    // Should be placed before express.static
    // To ensure that all assets and data are compressed (utilize bandwidth)
    app.use(express.compress({
        filter: function(req, res) {
            return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
        },
        // Levels are specified in a range of 0 to 9, where-as 0 is
        // no compression and 9 is best compression, but slowest
        level: 9
    }));


    // Set views path, template engine and default layout
    app.set('views', config.root + '/app/views');
    app.set('view engine', 'jade');

    app.configure(function() {

        // Routes should be at the last
        app.use(app.router);

        // Setting the fav icon and static folder
        app.use(express.favicon());
        app.use(express.static(config.root + '/public'));

        // Assume "not found" in the error msgs is a 404. this is somewhat
        // silly, but valid, you can do whatever you like, set properties,
        // use instanceof etc.
        app.use(function(err, req, res, next) {
            // Treat as 404
            if (~err.message.indexOf('not found')) return next();

            // Log it
            console.error(err.stack);

            // Error page
            res.status(500).render('500', {
                error: err.stack
            });
        });

        // Assume 404 since no middleware responded
        app.use(function(req, res, next) {
            res.status(404).render('404', {
                url: req.originalUrl,
                error: 'Not found'
            });
        });

    });
};