'use strict';

var User = require('../models/user').User;

exports.createUser = function(user, token, tokenSecret, next) {
	var newUser = new User({
		id: user.id,
		username: user.username,
		photos: user.photos,
		accessTokenKey: token,
		accessTokenSecret: tokenSecret,
		displayName: user.displayName,
		provider: user.provider,
		rawJson: user['_json']
	});
	newUser.save(function(err) {
		if (err) { return next(err); }
		next(null);
	});
};

exports.findUserById = function(id, next) {
	User.findOne({ id: id }, function(err, user) {
			next(err, user);
		});
};