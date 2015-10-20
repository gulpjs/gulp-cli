'use strict';
var gulp = require('gulp');

function noop(cb) {
  return cb();
}

gulp.task('default', gulp.series(noop));
