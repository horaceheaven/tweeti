(function() {
    'use strict';

    angular
        .module('app')
        .controller('TweetController', TweetController);

    TweetController.$inject = ['tweetService'];

    function TweetController(tweetService) {
        tweetService.scheduleTweet('test', Date.now()).then(function(response) {
            console.log(response.data);
            console.log(response.status);
        });
    }
}());