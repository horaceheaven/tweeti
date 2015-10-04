(function() {
    'use strict';

    angular
        .module('app')
        .controller('TweetController', TweetController);

    TweetController.$inject = ['tweetService'];

    function TweetController(tweetService) {
        var vm = this;

        vm.tweet = "";

        vm.scheduleTweet = function(tweet, postDateTime) {
            tweetService.scheduleTweetNow(tweet, postDateTime);
        };

        vm.scheduleTweetNow = function(tweet) {
            tweetService.scheduleTweetNow(tweet);
        };
    }
}());