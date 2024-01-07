'use strict';

var gulp = require('gulp');

gulp.task('default', function(done) {
  console.log('This gulpfile : ' + __filename);
  console.log('The current directory : ' + process.cwd());
  done();
});
