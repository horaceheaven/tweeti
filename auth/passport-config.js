'use strict';

module.exports = function() {
	var passport = require('passport');
	var TwitterStrategy = require('passport-twitter');
	var userService = require('../services/user-service');

	passport.use(new TwitterStrategy({
		consumerKey: process.env.TWITTER_CONSUMER_KEY,
		consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
		callbackUrl: 'http://127.0.0.1:3000/auth/twitter/callback'
	}, function(token, tokenSecret, profile, done) {
		userService.findUserById(profile.id, function(err, user) {
			if (err) { return done(err, null); }
			if (user) { return done(err, user); }
			userService.createUser(profile, token, tokenSecret, function(err) {
				if (err) { return done(err); }
				return done(null);
			});
		});
	}));

	passport.serializeUser(function(user, next) {
		next(null, user.id);
	});

	passport.deserializeUser(function(userID, next) {
		userService.findUserById(userID, function(err, user) {
			next(err, user);
		});
	});
};