/**
 * Created by horaceheaven on 11/28/15.
 */
(function() {
    'use strict';

    angular
        .module('app')
        .filter('relativeDateTime', RelativeDateTime);

    RelativeDateTime.$inject = [];

    function RelativeDateTime() {
        return function(dateTime) {
            return moment(dateTime).fromNow();
        };
    }
}());