'use strict';
var gulp = require('gulp');

function logGulpfilePath(cb) {
  console.log(__filename);
  return cb();
}

gulp.task('default', gulp.series(logGulpfilePath));
