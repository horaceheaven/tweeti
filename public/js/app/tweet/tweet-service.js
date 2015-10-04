/**
 * Created by horaceheaven on 10/4/15.
 */
(function () {
'use strict';

    angular
        .module('app')
        .factory('tweetService', tweetFactory);

    tweetFactory.$inject = ['$http'];

    function tweetFactory ($http) {
        return {
            scheduleTweet: scheduleTweet,
            scheduleTweetNow: scheduleTweetNow
        };

        function scheduleTweet (status, dateTime) {
            var data = { "status": status, "postDate": dateTime };

            return $http.post('/twitter/schedule', data);
        };

        function scheduleTweetNow (status) {
            return this.scheduleTweet(status, Date.now());
        };
    };
}());