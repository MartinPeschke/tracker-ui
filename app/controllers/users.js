'use strict';
var backend = require('../../models/backend');

/**
 * Auth callback
 */
exports.authCallback = function(req, res) {
    res.redirect('/');
};

/**
 * Show login form
 */
exports.signin = function(req, res) {
    res.render('users/signin', {
        title: 'Signin',
        message: req.flash('error')
    });
};

/**
 * Show sign up form
 */
exports.signup = function(req, res) {
    res.render('users/signup', {
        title: 'Sign up',
        user: {}
    });
};

/**
 * Logout
 */
exports.signout = function(req, res) {
    req.logout();
    res.redirect('/');
};

/**
 * Session
 */
exports.session = function(req, res) {
    return res.json(req.user);
};

/**
 * Create user
 */
exports.create = function(req, res, next) {
    backend.post('/company/signup', req.body, function(err, result){
        var company = result.Company;
        if(company){
            req.logIn(company, function(err) {
                if (err) return next(err);
                return res.json(result);
            });
        } else {
            return res.json({message: result.DbMessage});
        }
    });
};

/**
 * Send User
 */
exports.me = function(req, res) {
    res.jsonp(req.user || null);
};



/**
 * check email is available
 */

exports.checkEmail = function(req, res){
    backend.post('/user/EmailAvailable', req.query, function(err, result){
        return res.json({'success':!result.DbMessage});
    });
};