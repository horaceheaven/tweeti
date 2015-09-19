'use strict';

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var jshint = require('gulp-jshint');

gulp.task('default', ['start']);
 
gulp.task('start', function() {
	nodemon({
		script: 'bin/www',
		ext: 'js',
		tasks: ['lint'],
		env: { 'NODE_ENV': 'development' }
	});
});

gulp.task('lint', function() {
	return gulp.src(['*.js', 'routes/*.js'])
		.pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'));
});