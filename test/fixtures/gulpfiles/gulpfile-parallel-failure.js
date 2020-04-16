'use strict';

var gulp = require('gulp');

function noop(cb) {
  cb();
}

function errorFunction(cb) {
  cb(new Error('Error!'));
}

function notCompleting1() {
  // Callback is not called
}

gulp.task('default', gulp.parallel(errorFunction, noop));
gulp.task('broken', gulp.parallel(errorFunction, noop, notCompleting1));
