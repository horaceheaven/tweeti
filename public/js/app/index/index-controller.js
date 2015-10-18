(function() {
	'use strict';

	angular
		.module('app')
		.controller('IndexController', IndexController);

	IndexController.$inject = ['tweetService'];

	function IndexController(tweetService) {
		var vm = this;

		vm.twitterSignIn = function() {
			tweetService.twitterSignIn();
		};
	}
}());