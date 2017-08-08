'use strict';

var gulp = require('gulp');

function noop(cb) {
  cb();
}

function delayed(cb) {
  setTimeout(cb, 100);
}

gulp.task('task1', delayed);
gulp.task('task2', noop);
