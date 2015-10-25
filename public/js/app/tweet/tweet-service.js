/**
 * Created by horaceheaven on 10/4/15.
 */
(function () {
'use strict';

    angular
        .module('app')
        .factory('tweetService', tweetFactory);

    tweetFactory.$inject = ['$http', '$window'];

    function tweetFactory ($http, $window) {
        return {
            scheduleTweet: scheduleTweet,
            scheduleTweetNow: scheduleTweetNow,
            getScheduledTweets: getScheduledTweets,
            twitterSignIn: twitterSignIn
        };

        function scheduleTweet (status, dateTime) {
            var data = { "status": status, "postDate": dateTime };
            return $http.post('/twitter/schedule', data);
        };

        function scheduleTweetNow (status) {
            return this.scheduleTweet(status, Date.now());
        };

        function getScheduledTweets() {
            return $http.get('/twitter/user/schedule').then(function(response) {
                return response.data;
            });
        };

        function twitterSignIn() {
            return $window.location.href = '/auth/twitter';
        };
    };
}());