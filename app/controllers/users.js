'use strict';
var backend = require('../../models/backend');


/**
 * request password forgot email
 */

exports.pwdtokenvalid = function(req, res){
    backend.post('/user/LoginWithToken', req.body, function(err, result){
        return res.json(result);
    });
};
exports.pwdreset = function(req, res){
    var token = req.body.token, pwd = req.body.pwd, user;
    backend.post('/user/LoginWithToken', {'Token': token}, function(err, result){
        user = result.User;
        backend.post('/user/UpdatePassword', {pwd: pwd, id: user.Id}, function(err, result){
            return res.json({'success': !result.DbMessage});
        });
    });
};
