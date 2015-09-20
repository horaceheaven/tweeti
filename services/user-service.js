'use strict';

var User = require('../models/user').User;

exports.createUser = function(user, next) {
	console.log(JSON.stringify(user));
	var newUser = new User({
		id: user.id,
		username: user.username,
		displayName: user.displayName,
		provider: user.provider
	});

	newUser.save(function(err) {
		if (err) { return next(err); }
		next(null);
	});
};

exports.findUser = function(id, next) {
	User.findOne({ id: id }, 
		function(err, user) {
			next(err, user);
		});
};