'use strict';

var gulp = require('gulp');

function err(done) {
  done(new Error('Error!'));
}

function next(done) {
  done();
}

gulp.task('default', gulp.series(err, next));
