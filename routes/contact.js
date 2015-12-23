'use strict';

var format = require("string-template");
var config = require('../config/config').get(process.env.NODE_ENV);
var util = require('util');
var express = require('express');
var router = express.Router();

router.post('/info', function (req, res) {
    req.checkBody('fullName').notEmpty();
    req.checkBody('email').notEmpty().isEmail();
    req.checkBody('message').notEmpty();

    var errors = req.validationErrors();

    if(errors) {
        res.status(400).send(util.inspect(errors));
        return;
    }

    var contactInfo = {
        fullName: req.body.fullName,
        email: req.body.email,
        message: req.body.message
    };

    var message =
        'Full Name: {fullName} \n' +
        'Email Address: {email} \n' +
        'Message Body:\n' +
        '{message}';

    var contactEmailBody = format(message, contactInfo);

    var sendgrid  = require('sendgrid')(process.env.SEND_GRID_API_KEY);

    sendgrid.send({
        to:       config.contactEmail,
        from:     config.contactEmail,
        subject:  'Tweeti user contacted you! - ' + contactInfo.fullName,
        text:     contactEmailBody
    }, function(err, result) {
        if (err) {
            res.status(500).jsonp({ 'err': err });
            return console.error(err);
        }
        res.status(200).jsonp({ 'result': result });
        console.log(result);
    });

});

module.exports = router;