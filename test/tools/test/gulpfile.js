'use strict';

var gulp = require('gulp');

function fn1(done) {
  done();
}

function fn2(done) {
  done();
}

gulp.task('task1', fn1);
gulp.task('task2', fn2);
gulp.task('default', gulp.series('task1', 'task2'));
