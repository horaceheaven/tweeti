(function() {
	'use strict';

	angular
		.module('app')
		.config(config)
		.run(run);

	run.$inject = ['$rootScope', '$location', 'authService'];

    function run($rootScope, $location, authService) {
        $rootScope.$on('$routeChangeStart', function() {
            authService.isAuth().then(function (data) {
                if (data.isAuth) {
                } else {
                    $location.path('/');
                }
            });
        });
    };

	config.$inject = ['$routeProvider'];

	function config($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: '/js/app/index/index.html',
				controller: 'IndexController',
				controllerAs: 'vm'
			})
			.when('/post', {
				templateUrl: '/js/app/tweet/tweet.html',
				controller: 'TweetController',
				controllerAs: 'vm'
			});
	}

}());