'use strict';
var gulp = require('gulp');

function noop() {}
function described() {}
described.description = 'description';

gulp.task('test1', gulp.series(noop));
gulp.task('test2', gulp.series('test1', noop));
gulp.task('test3', gulp.series(described));

gulp.task('default', gulp.series('test1', 'test3', noop));
