'use strict';

var gulp = require('gulp');

gulp.task('default', function(done) {
  console.log(global.preload_one);
  console.log(global.preload_two);
  done();
});
