'use strict';

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	var vm = { 
		title: 'Tweeti',
		isAuth: req.isAuthenticated(),
		currentYear: new Date().getFullYear() 
	};
  	res.render('index', vm);
});

module.exports = router;
