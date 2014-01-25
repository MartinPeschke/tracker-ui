'use strict';

var LocalStrategy = require('passport-local').Strategy,
    config = require('./config'),
    backend = require('../models/backend'),
    user = require('../models/user');


module.exports = function(passport) {

    passport.serializeUser(function(user, done) {
        done(null, user);
    });
    passport.deserializeUser(function(user_data, done) {
        done(null, user_data);
    });

    // Use local strategy
    passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password'
        },
        function(email, password, done) {
            backend.post('/user/login', {email:email, pwd:password}, function(err, result){
                var login_success = result.User&&result.User.Id;
                if(!login_success)
                    done(null, login_success, {message: 'Unknown user'});
                else
                    done(null, result);
            });
        }
    ));
};