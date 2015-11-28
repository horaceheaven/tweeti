(function() {
    'use strict';

    angular
        .module('app')
        .controller('TweetController', TweetController);

    TweetController.$inject = ['tweetService', 'authService'];

    function TweetController(tweetService, authService) {
        var vm = this;

        vm.tweet = "";
        vm.tweetDate = moment().add(1, 'h').format("MM/DD/YYYY h:mm A");

        vm.scheduleTweet = function(tweet, postDateTime) {
            var postDateTime = moment(postDateTime).valueOf();
            if (tweet && postDateTime) {
                return tweetService.scheduleTweet(tweet, postDateTime);
            } else {
                // TODO: add a flash statement
            }
        };

        vm.getScheduledTweets = function() {
            return tweetService.getScheduledTweets().then(function(data) {
                vm.listOfCompletedScheduledTweets = data && data.complete ? data.complete : [];
                vm.listOfDelayedScheduledTweets = data && data.delayed ? data.delayed : [];
            });
        };

        vm.getUserDetails = function() {
            return authService.getUserDetails().then(function(data) {
                vm.username = data && data.username ? data.username : '';
                vm.userPhoto = data && data.photos && data.photos.length > 0 ? data.photos[0].value : '';
            });
        };

        vm.tweetNow = function(tweet) {
            var postDate = moment().valueOf();
            vm.scheduleTweet(tweet, postDate).then(function(data) {
                if (data.status === 200) {
                    vm.listOfCompletedScheduledTweets.unshift({data: {postDateTime: postDate, status: tweet}})
                    vm.tweet = '';
                } else {
                    // TODO: add a flash statement
                }
            });
        };

        vm.tweetLater = function(tweet, postDate) {
            var postDate = moment(postDate).valueOf();
            vm.scheduleTweet(tweet, postDate).then(function(data) {
                if (data.status === 200) {
                    vm.listOfDelayedScheduledTweets.unshift({data: {postDateTime: postDate, status: tweet}})
                    vm.tweet = '';
                } else {
                    // TODO: add a flash statement
                }
            });
        };

        vm.getUserDetails();
        vm.getScheduledTweets();
    }
}());