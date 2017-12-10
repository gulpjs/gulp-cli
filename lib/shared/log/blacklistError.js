'use strict';

var log = require('gulplog');

var exit = require('../exit');
var color = require('../colorize');

function logBlacklistError(err) {
  log.error(color.error('Error: failed to retrieve plugins blacklist'));
  log.error(err.message); // Avoid duplicating for each version
  exit(1);
}

module.exports = logBlacklistError;
