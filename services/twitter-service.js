/**
 * Created by horaceheaven on 10/10/15.
 */
var _ = require('lodash');
var queueService = require('../services/queue-service');

var self = {};

self.getAllUserScheduledTweets = function(username) {
    return queueService.getAllJobIDsByUserName(username.toString())
        .then(queueService.getAllJobInfoByJobIDs);
};

self.getAllUserScheduledTweetsGroupedByState = function(username) {
    return self.getAllUserScheduledTweets(username).then(function(tweets) {
        return _.groupBy(tweets, 'state');
    });
};

module.exports = self;