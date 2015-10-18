'use strict';

var gulp = require('gulp');
var install = require('gulp-install');
var nodemon = require('gulp-nodemon');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');

gulp.task('default', ['start']);
 
gulp.task('start', function() {
	nodemon({
		script: 'bin/www',
		ext: 'js',
		tasks: ['lint'],
		env: { 'NODE_ENV': 'development' }
	});
});

gulp.task('test', function () {
	process.env.TWITTER_CONSUMER_KEY = "this is a test consumer key";
	process.env.TWITTER_CONSUMER_SECRET = "this is a test consumer secret";

	return gulp.src(['tests/api/integration/*.js'], { read: false })
		.pipe(mocha({
			reporter: 'spec'
		}))
		.once('end', function () {
			process.exit();
		});
});

gulp.task('lint', function() {
	return gulp.src(['*.js', 'routes/*.js'])
		.pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('install', function() {
	return gulp.src(['./package.json', './bower.json'])
		.pipe(install());
});