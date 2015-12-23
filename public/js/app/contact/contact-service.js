/**
 * Created by horaceheaven on 12/23/15.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .factory('contactService', contactFactory);

    contactFactory.$inject = ['$http'];

    function contactFactory ($http) {
        return {
            submitInfo: submitInfo
        };

        function submitInfo (info) {
            console.log(JSON.stringify(info));
            return $http.post('/contact/info', info);
        };
    };
}());