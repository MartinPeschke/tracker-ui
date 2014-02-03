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
    backend.post('/user/signup', req.body, function(err, result){
        var user = result.User;
        if(user&&user.Id){
            req.logIn(user, function(err) {
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



/**
 * request password forgot email
 */

exports.pwdforgot = function(req, res){
    backend.post('/user/passwordforget', req.body, function(err, result){
        return res.json(result);
    });
};
exports.pwdtokenvalid = function(req, res){
    backend.post('/user/LoginWithToken', req.body, function(err, result){
        return res.json(result);
    });
};
exports.pwdreset = function(req, res){
    var token = req.body.token, pwd = req.body.pwd, user;

    backend.post('/user/LoginWithToken', {'PwdForgetTokens':[{'Token': token}]}, function(err, result){
        user = result.User;
        backend.post('/user/UpdatePassword', {pwd: pwd, id: user.Id}, function(err, result){
            return res.json({'success': !result.DbMessage});
        });
    });
};


exports.account_setup = function(req, res){
    backend.post('/account/create', req.body, function(err, result){
        return res.json(result);
    });
};