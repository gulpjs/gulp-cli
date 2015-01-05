'use strict';

var chalk = require('chalk');
var gutil = require('gulp-util');

var exit = require('../exit');

function logBlacklistError(err) {
  gutil.log(chalk.red('Error: failed to retrieve plugins black-list'));
  gutil.log(err.message); // avoid duplicating for each version
  exit(1);
}

module.exports = logBlacklistError;
