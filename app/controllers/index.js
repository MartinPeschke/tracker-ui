'use strict';

exports.render = function(req, res) {
    res.render('index', {
        User: req.user ? JSON.stringify(req.user) : 'null'
    });
};
