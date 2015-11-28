'use strict';

var gulp = require('gulp');
var install = require('gulp-install');
var nodemon = require('gulp-nodemon');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

gulp.task('default', ['start']);
 
gulp.task('start', function() {
	nodemon({
		script: 'bin/www',
		ext: 'js',
		ignore: ['public/js/**/*.js'],
		tasks: ['lint', 'uglify-js'],
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

gulp.task('uglify-js', function() {
	return gulp.src([
		'public/js/app/*.js',
		'public/js/app/**/*.js'
	])
	.pipe(concat('app.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('public/js/app/build'));
});