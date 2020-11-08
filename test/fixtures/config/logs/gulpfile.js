'use strict';

var gulp = require('gulp');

function clean(done) {
  done();
}
clean.description = 'Clean files.';

function build(done) {
  done();
}
build.description = 'Build source files.';
build.flags = {
  aaa: 'flag --aaa for build.',
  bbb: 'bbb',
};

gulp.task(clean);
gulp.task(build);
gulp.task('default', gulp.series(clean, build));
