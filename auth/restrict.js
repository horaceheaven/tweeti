'use strict';

module.exports = function(req, res, next) {
	if(req.isAuthenticated()) {
		return next();
	}
	return res.status(401).jsonp({"message": "Unauthorized"});
};