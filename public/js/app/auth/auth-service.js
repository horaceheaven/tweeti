/**
 * Created by horaceheaven on 10/4/15.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .factory('authService', authFactory);

    authFactory.$inject = ['$http'];

    function authFactory ($http) {
        return {
            isAuth: isAuth
        };

        function isAuth () {
            return $http.get('/auth/isauth').then(function(response) {
                return response.data;
            }, function(response) {
                return response.data;
            });
        };
    };
}());