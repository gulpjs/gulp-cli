import gulp from 'gulp';

function noop(cb) {
  cb();
}

gulp.task('registered', noop);

export function exported(){};
export const string = 'no function';
