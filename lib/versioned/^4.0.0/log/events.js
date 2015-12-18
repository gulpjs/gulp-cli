'use strict';

var log = require('gulplog');
var chalk = require('chalk');
var prettyTime = require('pretty-hrtime');
var formatError = require('../formatError');

// Wire up logging events
function logEvents(gulpInst) {

  var loggedErrors = [];

  gulpInst.on('start', function(e) {
    // TODO: batch these
    // so when 5 tasks start at once it only logs one time with all 5
    log.info('Starting', '\'' + chalk.cyan(e.name) + '\'...');
  });

  gulpInst.on('stop', function(e) {
    var time = prettyTime(e.duration);
    log.info(
      'Finished', '\'' + chalk.cyan(e.name) + '\'',
      'after', chalk.magenta(time)
    );
  });

  gulpInst.on('error', function(e) {
    var msg = formatError(e);
    var time = prettyTime(e.duration);
    log.error(
      '\'' + chalk.cyan(e.name) + '\'',
      chalk.red('errored after'),
      chalk.magenta(time)
    );

    // If we haven't logged this before, log it and add to list
    if (loggedErrors.indexOf(e.error) === -1) {
      log.error(msg);
      loggedErrors.push(e.error);
    }
  });
}

module.exports = logEvents;
