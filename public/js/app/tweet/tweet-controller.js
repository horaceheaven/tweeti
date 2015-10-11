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
            if (tweet && postDateTime) {
                tweetService.scheduleTweet(tweet, postDateTime);
            } else {
                // TODO: add a flash statement
            }
        };

        vm.scheduleTweetNow = function(tweet) {
            vm.scheduleTweet(tweet, Date.now());
        };

        vm.getScheduledTweets = function() {
            tweetService.getScheduledTweets().then(function(data) {
                console.log(JSON.stringify(data.data));
                vm.listOfScheduledTweets = data.data;
            });
        };

        vm.getScheduledTweets();
    }
}());