import * as gulp from 'gulp';

export function clean(done) { console.log('clean!'); done(); };
export function build(done) { console.log('build!'); done(); };
export const string = 'no function';
export const dist = gulp.series(clean, build);
