'use strict';

var gulp = require('gulp');

// Test case when description and flags are gotten by gulp.task(name)
gulp.task('task1', function() {});
gulp.task('task1').description = 'Description for gulp.task("task1")';
gulp.task('task1').flags = {
  '--flag-of-task1': 'Description for flag of task1',
};

// Test case when description and flags are gotten by gulp.task(name).unwrap()
gulp.task('task2', function() {});
if (!gulp.task('task2').unwrap) {
  var fn2 = function() {};
  gulp.task('task2').unwrap = function() {
    return fn2;
  };
}
gulp.task('task2').unwrap().description =
  'Description for gulp.task("task2").unwrap()';
gulp.task('task2').unwrap().flags = {
  '--flag-of-task2': 'Description for flag of task2',
};

// Test case when description and flags are gotten by both gulp.task(name) and
// gulp.task(name).unwrap() => Use things by gulp.task(name) preferentially.
gulp.task('task3', function() {});
if (!gulp.task('task3').unwrap) {
  var fn3 = function() {};
  gulp.task('task3').unwrap = function() {
    return fn3;
  };
}
gulp.task('task3').description =
  'Use gulp.task("task3").description preferentially';
gulp.task('task3').flags = {
  '--flag0-of-task3': 'Description for flag0 of task3',
  '--flag1-of-task3': 'Use gulp.task("task3").flags preferentially',
};
gulp.task('task3').unwrap().description =
  'This description should not output';
gulp.task('task3').unwrap().flags = {
  '--flag1-of-task3': 'This description should not output',
  '--flag2-of-task3': 'This description should not output',
};

gulp.task('no-desc', function() {});
if (!gulp.task('no-desc').unwrap) {
  var fn4 = function() {};
  gulp.task('no-desc').unwrap = function() {
    return fn4;
  };
}

gulp.task('default', gulp.series('task1', gulp.parallel('task2', 'task3')));

