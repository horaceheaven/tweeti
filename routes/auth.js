'use strict';

var express = require('express');
var passport = require('passport');

var router = express.Router();

router.get('/twitter', passport.authenticate('twitter'));

router.get('/twitter/callback', passport.authenticate('twitter', { 
	failureRedirect: '/users/login',
	successRedirect: '/',
	failureFlash: 'Invalid credentials' 
}));

router.get('/isauth', function (req, res) {
    if (req.isAuthenticated()) {
        res.status(200).jsonp({"isAuth": true, "message": "Authorized"});
    } else {
        res.status(401).jsonp({"isAuth": false,"message": "Unauthorized"});
    }
});

module.exports = router;
