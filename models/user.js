'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// TODO: add model validation
var userSchema = new Schema({
	id: { type: String },
	username: { type: String },
	photos: { type: Array },
	accessTokenKey: { type: String },
	accessTokenSecret: { type: String },
	displayName: { type: String },
	provider: { type: String },
	rawJson: { type: Object },
	createdAt: { type: Date, default: Date.now }
});

var User = mongoose.model('User', userSchema);

module.exports = {
	User: User
};