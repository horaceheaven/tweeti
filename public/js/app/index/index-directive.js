(function() {
    'use strict';

    angular
        .module('app')
        .directive('typed', typed);

    function typed() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                $(element).typed({
                    strings: ["Hi, My Name is Tweeti", "I will save and schedule your tweets for you =]"],
                    typeSpeed: 0
                });
            }
        };
    }
}());