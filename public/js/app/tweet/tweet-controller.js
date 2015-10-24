(function() {
    'use strict';

    angular
        .module('app')
        .controller('TweetController', TweetController);

    TweetController.$inject = ['tweetService', 'authService'];

    function TweetController(tweetService, authService) {
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
                vm.listOfScheduledTweets = data && data.data ? data.data : [];
            });
        };

        vm.getUserDetails = function() {
            authService.getUserDetails().then(function(data) {
                vm.username = data && data.username ? data.username : '';
                vm.userPhoto = data && data.photos && data.photos.length > 0 ? data.photos[0].value : '';
                console.log(vm.userPhoto)
            });
        };

        vm.getUserDetails();
        vm.getScheduledTweets();
    }
}());