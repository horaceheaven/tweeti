/**
 * Created by horaceheaven on 10/10/15.
 */
var Q = require('q');
var restler = require('restler');

var self = {};

var validateRequest = function(restler) {
    var defer = Q.defer();

    restler.on('success', defer.resolve);
    restler.on('fail', function(data, response) {
        console.log('request failed with', data, 'response', response);
        defer.reject(data);
    });
    restler.on('error', function(err, response) {
        console.log('request error with', err, 'response', response);
        defer.reject(err);
    });

    return defer.promise;
};

self.get = function(url, options) {
    console.log('making request to', url, 'with options', options);
    var defer = Q.defer();
    var promise = defer.promise;
    if (url) {
        promise = validateRequest(restler.get(url, options));
        promise.then(function(data) {}, function(err) {});
    } else {
        throw new Error('url required');
    }
    return promise;
};

module.exports = self;