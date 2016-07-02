'use strict';

var gulp = require('gulp');

gulp.task('task1', function() {});
gulp.task('task1').description = 'Description for gulp.task("task1")';

gulp.task('task2', function() {});
if (!gulp.task('task2').unwrap) {
  var fn2 = function() {};
  gulp.task('task2').unwrap = function() {
    return fn2;
  };
}
gulp.task('task2').unwrap()
  .description = 'Description for gulp.task("task2").unwrap()';

gulp.task('task3', function() {});
gulp.task('task3', function() {});
if (!gulp.task('task3').unwrap) {
  var fn3 = function() {};
  gulp.task('task3').unwrap = function() {
    return fn3;
  };
}
gulp.task('task3')
  .description = 'Use gulp.task("task3").description preferentially';
gulp.task('task3').unwrap().description = 'This description should not output';

gulp.task('no-desc', function() {});
gulp.task('no-desc', function() {});
if (!gulp.task('no-desc').unwrap) {
  var fn4 = function() {};
  gulp.task('no-desc').unwrap = function() {
    return fn4;
  };
}

gulp.task('default', gulp.series('task1', gulp.parallel('task2', 'task3')));

