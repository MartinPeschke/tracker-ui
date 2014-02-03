'use strict';

module.exports = function(app, passport, auth) {

    // User Routes
    var users = require('../app/controllers/users');
    app.get('/signin', users.signin);
    app.get('/signup', users.signup);
    app.get('/signout', users.signout);
    app.get('/users/me', users.me);
    app.get('/email/taken', users.checkEmail);

    // Setting up the users api
    app.post('/users', users.create);
    app.post('/account', users.account_setup);
    app.post('/events', users.events);

    // Setting the local strategy route
    app.post('/users/session', passport.authenticate('local', {}), users.session);
    app.post('/user/pwdforgot', users.pwdforgot);
    app.post('/user/pwdtokenvalid', users.pwdtokenvalid);
    app.post('/user/pwdreset', users.pwdreset);

    // Home route
    var index = require('../app/controllers/index');
    app.get('/', index.render);
};
