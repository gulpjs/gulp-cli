'use strict';

var gulp = require('gulp');

function noop(cb) {
  cb();
}

function described(cb) {
  cb();
}

function delayed(cb) {
  setTimeout(cb, 100);
}

function errorFunction() {
  throw new Error('Error!');
}
function anon(cb) {
  cb();
}

function notCompleting1() {
  // Callback is not called
}

function notCompleting2() {
  // Callback is not called
}

described.description = 'description';

gulp.task('test1', gulp.series(noop));
gulp.task('test2', gulp.series('test1', noop));
gulp.task('test3', gulp.series(described));
gulp.task('test4', gulp.series(errorFunction, anon));
gulp.task('test5', delayed);
gulp.task('test6', noop);
gulp.task('test7', notCompleting1);
gulp.task('test8', notCompleting2);

gulp.task('default', gulp.series('test1', 'test3', noop));
