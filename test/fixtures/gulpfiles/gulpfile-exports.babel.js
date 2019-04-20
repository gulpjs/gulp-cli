// jscs:disable

'use strict';

import gulp from 'gulp';

export function clean(){};
export function build(){};
export const string = 'no function';
export const dist = gulp.series(clean, build);
function p1(){}
function p2(){}
export const p = gulp.parallel(p1, p2);

export const sTest = gulp.series(clean, build);
sTest.displayName = 's-test';

export const pTest = gulp.parallel(p1, p2);
pTest.displayName = 'p-test';

export function fTest(){};
fTest.displayName = 'f-test';
