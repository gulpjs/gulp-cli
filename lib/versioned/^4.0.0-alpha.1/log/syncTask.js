'use strict';

var log = require('gulplog');
var chalk = require('chalk');
var prettyMs = require('pretty-ms');

function logSyncTask(gulpInst, opts) {

  // If timeout is 0, don't wire anything up
  if (!opts.timeout) {
    return;
  }

  var timeouts = {};

  function warn(e) {
    log.warn(
      '\'' + chalk.cyan(e.name) + '\'',
      chalk.red('Task did not complete after ' + prettyMs(opts.timeout) + '.'),
      chalk.red('Did you forget to signal async completion?')
    );
  }

  function start(e) {
    timeouts[e.uid] = setTimeout(warn, opts.timeout, e);
  }

  function clear(e) {
    clearTimeout(timeouts[e.uid]);
    delete timeouts[e.uid];
  }

  gulpInst.on('start', start);
  gulpInst.on('stop', clear);
  gulpInst.on('error', clear);
}

module.exports = logSyncTask;
