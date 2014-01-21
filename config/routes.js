'use strict';

module.exports = function(app, passport, auth) {

    // User Routes
    var users = require('../app/controllers/users');
    app.get('/signin', users.signin);
    app.get('/signup', users.signup);
    app.get('/signout', users.signout);
    app.get('/users/me', users.me);

    // Setting up the users api
    app.post('/users', users.create);

    // Setting the local strategy route
    app.post('/users/session', passport.authenticate('local', {}), users.session);

    // Home route
    var index = require('../app/controllers/index');
    app.get('/', index.render);
};
