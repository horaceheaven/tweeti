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

module.exports = router;
