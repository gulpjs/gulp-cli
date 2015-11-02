'use strict';

var gulp = require('gulp');

function noop() {}
function described() {}
function errorFunction() {
  throw new Error('Error!');
}
function anon(cb) {
  return cb()
}
described.description = 'description';

gulp.task('test1', gulp.series(noop));
gulp.task('test2', gulp.series('test1', noop));
gulp.task('test3', gulp.series(described));
gulp.task('test4', gulp.series(errorFunction, anon));

gulp.task('default', gulp.series('test1', 'test3', noop));
