'use strict';

var express = require('express');
var passport = require('passport');

var router = express.Router();

router.get('/twitter', passport.authenticate('twitter'));

router.get('/twitter/callback', passport.authenticate('twitter', { 
	failureRedirect: '/#/',
	successRedirect: '/#/post',
	failureFlash: 'Invalid credentials' 
}));

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/#/');
});

router.get('/isauth', function (req, res) {
    if (req.isAuthenticated()) {
        res.status(200).jsonp({"isAuth": true, "message": "Authorized"});
    } else {
        res.status(401).jsonp({"isAuth": false,"message": "Unauthorized"});
    }
});

module.exports = router;
