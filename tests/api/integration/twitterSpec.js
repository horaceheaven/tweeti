/**
 * Created by horaceheaven on 10/3/15.
 */
'use strict';

var expect = require('chai').expect;
var request = require('supertest');
var express = require('express');
var sinon = require('sinon');
var passportStub = require('passport-stub');
var queue = require('kue').createQueue();
var redis = require('redis').createClient();

var app = require('../../../app');

passportStub.install(app);

describe('POST /twitter/schedule', function () {

    describe('when unauthenticated', function () {
        it('should respond with 401', function (done) {
            passportStub.logout();
            request(app)
                .post('/twitter/schedule')
                .expect(401, done);
        });

        it('should send the user unauthenticated json message', function (done) {
            passportStub.logout();
            var testData = {
                "status": "sample status",
                "postDate": "1443918479581"
            };

            var expectedMessage = {message: 'Unauthorized'};

            request(app)
                .post('/twitter/schedule')
                .send(testData)
                .expect(expectedMessage, done);
        });
    });

    describe('when empty request body is sent', function () {
        it('should respond with 400', function (done) {
            passportStub.login({username: 'testuser'});
            request(app)
                .post('/twitter/schedule')
                .send({})
                .expect(400, done);
        });
    });

    describe('when request has all the fields', function () {
        it('shoud respond with 200', function (done) {
            passportStub.login({username: 'testuser'});
            var testData = {
                "status": "sample status",
                "postDate": "1443918479581"
            };

            var expectedRes = {
                response: 'tweet scheduled successfully'
            };

            request(app)
                .post('/twitter/schedule')
                .send(testData)
                .expect(200)
                .expect(expectedRes, done);
        });
    });
});