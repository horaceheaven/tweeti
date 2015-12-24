'use strict';

angular
	.module('app', ['ngRoute', 'flash', 'ngAnimate'])
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.otherwise({ redirectTo: '/' });
	}]); 