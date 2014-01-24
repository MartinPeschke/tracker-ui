'use strict';

exports.render = function(req, res) {
    res.render('index', {
        Company: req.user ? JSON.stringify(req.user) : 'null'
    });
};
