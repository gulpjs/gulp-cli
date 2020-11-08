'use strict';

var gulp = require('gulp');

function clean(done) {
  done();
}

function build(done) {
  done();
}

gulp.task(clean);
gulp.task(build);
gulp.task('default', gulp.series(clean, build));
