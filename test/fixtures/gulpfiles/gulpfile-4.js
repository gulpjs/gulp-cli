'use strict';

var gulp = require('gulp');

function func1(done) {
  done();
}

function func2(done) {
  done();
}

function func3(done) {
  done();
}

function func4(done) {
  done();
}

gulp.task('taskC', gulp.series(func1, func2));

gulp.task('taskB', gulp.parallel(func3, 'taskC'));

gulp.task('default', gulp.parallel('taskC', gulp.series('taskB', func4)));

