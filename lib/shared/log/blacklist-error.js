'use strict';

var log = require('gulplog');
var chalk = require('chalk');

var exit = require('../exit');

/* istanbul ignore next */
function logBlacklistError(err) {
  log.error(chalk.red('Error: failed to retrieve plugins black-list'));
  log.error(err.message); // Avoid duplicating for each version
  exit(1);
}

module.exports = logBlacklistError;
