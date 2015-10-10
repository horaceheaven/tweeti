/**
 * Created by horaceheaven on 10/10/15.
 */
var queueService = require('../services/queue-service');

var self = {};

self.getAllUserScheduledTweets = function(username) {
    return queueService.getAllJobIDsByUserName(username.toString())
        .then(queueService.getAllJobInfoByJobIDs);
};

module.exports = self;