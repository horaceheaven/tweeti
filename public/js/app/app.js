'use strict';

angular
	.module('app', ['ngRoute', 'ngMaterial'])
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.otherwise({ redirectTo: '/' });
	}]); 