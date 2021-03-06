/**
 * Created by horaceheaven on 10/10/15.
 */
var httpService = require('../services/external-service');
var uriConst = require('../constants/uri');
var Q = require('q');
var _ = require('lodash');
var self = {};

self.getAllJobIDsByUserName = function(username) {
    var defer = Q.defer();
    httpService.get(uriConst.queue.URI +':'+ uriConst.queue.port + uriConst.queue.search + username.toString())
        .then(function(data) {
            defer.resolve(data);
            console.log('got job IDs for user', username, JSON.stringify(data));
        }, defer.reject);
    return defer.promise;
};

self.getJobInfoByJobID = function(jobID) {
    var defer = Q.defer();
    var url = uriConst.queue.URI +':'+ uriConst.queue.port + uriConst.queue.job + jobID;
    console.log('getting job info by job id using url', url);
    httpService.get(url)
        .then(function(jobInfo) {
            console.log('got job info for ID', jobID, JSON.stringify(jobInfo));
            self.filterJobInfo(jobInfo);
            defer.resolve(jobInfo);
        }, defer.reject);
    return defer.promise;
};

self.filterJobInfo = function(jobInfo) {
    if (!_.isEmpty(jobInfo) && _.isObject(jobInfo)
        && !_.isEmpty(jobInfo.data) && _.isObject(jobInfo.data)) {
        delete jobInfo.data.consumerKey;
        delete jobInfo.data.consumerSecret;
    }
};

self.getAllJobInfoByJobIDs = function(jobIDList) {
    console.log('getting all job info using job list', JSON.stringify(jobIDList));

    return Q.all(_.map(jobIDList, function(jobID) {
        return self.getJobInfoByJobID(jobID)
    }));
};

module.exports = self;