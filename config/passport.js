'use strict';

var LocalStrategy = require('passport-local').Strategy,
    TwitterStrategy = require('passport-twitter').Strategy,
    FacebookStrategy = require('passport-facebook').Strategy,
    GitHubStrategy = require('passport-github').Strategy,
    GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
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
            backend.post('/account/login', {email:email, pwd:password}, function(err, result){
                var user = result.User;
                done(null, user, user?null:{message: 'Unknown user'});
            });
        }
    ));

};