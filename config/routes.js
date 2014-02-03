'use strict';

module.exports = function(app) {

    // User Routes
    var users = require('../app/controllers/users');

    // Setting the local strategy route
    app.post('/user/pwdtokenvalid', users.pwdtokenvalid);
    app.post('/user/pwdreset', users.pwdreset);

    // Home route
    var index = require('../app/controllers/index');
    app.get('/', index.render);
};
