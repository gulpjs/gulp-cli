// jscs:disable

'use strict';

import gulp from 'gulp';

export function clean(){};
export function build(){};
export const dist = gulp.series(clean, build);
