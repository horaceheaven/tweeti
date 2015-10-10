'use strict';

var util = require('util');
var kue = require('kue');
var twitterService = require('../services/twitter-service');
var express = require('express');
var router = express.Router();

var queue = kue.createQueue({
    disableSearch: false
});

router.get('/user/schedule', function (req, res) {
    console.log(JSON.stringify(req.user));
    if (req.user && req.user.username) {
        twitterService.getAllUserScheduledTweets(req.user.username).then(function(data) {
            res.status(200).jsonp(data);
        });
    } else {
        res.status(401).send({ 'response': 'user not found' });
    }
});

router.post('/schedule', function (req, res) {
    req.checkBody('status').notEmpty();
    req.checkBody('postDate').notEmpty().isInt();

    var errors = req.validationErrors();

    if(errors) {
        res.status(400).send(util.inspect(errors));
        return;
    }

    if (req.user) {
        var now = Date().now;
        var postDateTime = new Date(req.body.postDate);

        queue.create('tweet', {
            title: 'Tweet by ' + req.user.username + ' '+ postDateTime,
            username: req.user.username,
            consumerKey: process.env.TWITTER_CONSUMER_KEY,
            consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
            accessTokenKey: req.user.accessTokenKey,
            accessTokenSecret: req.user.accessTokenSecret,
            status: req.body.status
        })
            .delay(postDateTime - now)
            .attempts(3)
            .backoff({ delay: 6000, type: 'exponential' })
            .priority('high')
            .searchKeys( ['username'] )
            .save(function (err) {
                if (err) {
                    res.status(500).jsonp({ 'response': 'failed to schedule tweet' });
                }
                res.status(200).jsonp({ 'response': 'tweet scheduled successfully' });
            });

    } else {
        res.status(401).jsonp({ 'response': 'user not found' });
    }
});

module.exports = router;