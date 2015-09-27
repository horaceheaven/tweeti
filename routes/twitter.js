'use strict';

var kue = require('kue');
var express = require('express');
var router = express.Router();

var userService = require('../services/user-service');

var jobs = kue.createQueue();

router.post('/post', function (req, res) {
    userService.findUserById(req.user.id, function(err, user) {
        if (err) {
            res.status(500).jsonp({ 'response': 'error while finding user' });
        }

        if (user) {
            jobs.create('tweet', {
                title: 'post to twitter',
                consumerKey: process.env.TWITTER_CONSUMER_KEY,
                consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
                accessTokenKey: user.accessTokenKey,
                accessTokenSecret: user.accessTokenSecret,
                status: req.body.status
            })
            .delay(5000)
            .priority('high')
            .save();

            // TODO wrap in success case for job
            res.status(200).jsonp({ 'response': 'tweet scheduled successfully' });
        } else {
            res.status(404).jsonp({ 'response': 'user not found' });
        }
    });
});

module.exports = router;