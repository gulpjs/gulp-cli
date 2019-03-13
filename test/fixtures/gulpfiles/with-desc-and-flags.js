'use strict';

var gulp = require('gulp');

function clean() {}
clean.description = 'Delete dist folder';
gulp.task(clean);

gulp.task('scripts', scripts);
function scripts() {}
scripts.description = 'Bundles JavaScript';

var styles = function() {};
gulp.task('styles', styles);
gulp.task('styles').description = 'Compiles and bundles CSS';

var build = gulp.series('clean', 'scripts', 'styles');
build.description = 'Build all the things!';
build.flags = {
  '--dev': 'un-minified',
  '--production': 'compressed into single bundle',
  '': 'dummy-empty-string',
};
gulp.task('build', build);

gulp.task('serve', serve);
function serve() {}
serve.description = 'Serves files reloading';
serve.flags = {
  '--lr': 'with live reloading',
};

function watch() {}
gulp.task('watch', watch);
watch.description = 'Watch files and build on change';

gulp.task('default', gulp.series('build', 'watch'));
gulp.task('default').description = 'Build and watch for changes';
