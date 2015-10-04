(function() {
    'use strict';

    angular
        .module('app')
        .controller('TweetController', TweetController);

    TweetController.$inject = ['tweetService'];

    function TweetController(tweetService) {
        tweetService.scheduleTweetNow('test').then(function(response) {
            console.log(response.data);
            console.log(response.status);
        });
    }
}());