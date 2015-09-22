'use strict';

var log = require('gulplog');
var chalk = require('chalk');

var timeouts = {};

function warn(e) {
  log.warn(
    '\'' + chalk.cyan(e.name) + '\'',
    chalk.red('Task did not complete after 10s.'),
    chalk.red(' Did you forget to signal async completion?')
  );
}

function start(e) {
  timeouts[e.uid] = setTimeout(warn, 10000, e);
}

function clear(e) {
  clearTimeout(timeouts[e.uid]);
  delete timeouts[e.uid];
}

function logSyncTask(gulpInst) {
  gulpInst.on('start', start);
  gulpInst.on('stop', clear);
  gulpInst.on('error', clear);
}

module.exports = logSyncTask;
