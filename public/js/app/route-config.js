(function() {
	'use strict';

	angular
		.module('app')
		.config(config);

	config.$inject = ['$routeProvider'];

	function config($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: '/js/app/index/index.html',
				controller: 'IndexController',
				controllerAs: 'vm'
			});
	}

}());