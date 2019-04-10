'use strict';
var gulp = require('gulp');
gulp.task('a', function() {
  throw new Error('Task \'a\' failed!');
});
gulp.task('b', gulp.parallel('a'));
gulp.task('default', gulp.series(gulp.parallel('b')));
