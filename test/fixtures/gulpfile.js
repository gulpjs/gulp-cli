'use strict';

var gulp = require('gulp');

function noop(){}
function described(){}
described.description = 'description';

gulp.task('test1', noop);
gulp.task('test2', noop);
gulp.task('test3', described);

gulp.task('default', noop);
