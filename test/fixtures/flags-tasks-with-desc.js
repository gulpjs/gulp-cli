'use strict';

var gulp = require('gulp');

function clean () {}
gulp.task(clean).description = 'Delete dist folder';

gulp.task('scripts', function() {})
  .description = 'Bundles JavaScript';

gulp.task('styles', function() {})
  .description = 'Compiles and bundles CSS';

gulp.task('build', gulp.series('clean', 'scripts', 'styles'))
  .description = {
    '': 'Build all the things!',
    '--dev': 'un-minified',
    '--production': 'compressed into single bundle'
  };

gulp.task('serve', function() {
}).description = {
    '': 'Serves files reloading',
    '--lr': 'with live reloading',
  };

gulp.task('watch', function() {})
  .description = 'Watch files and build on change';

gulp.task('default', gulp.series('build', 'watch'))
  .description = 'Build and watch for changes';
