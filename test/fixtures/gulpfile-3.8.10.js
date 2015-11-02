'use strict';
var gulp = require('gulp');

function noop() {}
function described() {}
described.description = 'description';

gulp.task('test1', noop);
gulp.task('test2', ['test1'], noop);
gulp.task('test3', described);

gulp.task('default', ['test1', 'test3'], noop);
