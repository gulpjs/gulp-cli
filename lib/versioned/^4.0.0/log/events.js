'use strict';

var log = require('gulplog');
var chalk = require('chalk');
var prettyTime = require('pretty-hrtime');
var formatError = require('../formatError');

// Wire up logging events
function logEvents(gulpInst) {

  var loggedErrors = [];

  gulpInst.on('start', function(evt) {
    // TODO: batch these
    // so when 5 tasks start at once it only logs one time with all 5
    log.info('Starting', '\'' + chalk.cyan(evt.name) + '\'...');
  });

  gulpInst.on('stop', function(evt) {
    var time = prettyTime(evt.duration);
    log.info(
      'Finished', '\'' + chalk.cyan(evt.name) + '\'',
      'after', chalk.magenta(time)
    );
  });

  gulpInst.on('error', function(evt) {
    var msg = formatError(evt);
    var time = prettyTime(evt.duration);
    log.error(
      '\'' + chalk.cyan(evt.name) + '\'',
      chalk.red('errored after'),
      chalk.magenta(time)
    );

    // If we haven't logged this before, log it and add to list
    if (loggedErrors.indexOf(evt.error) === -1) {
      log.error(msg);
      loggedErrors.push(evt.error);
    }
  });
}

module.exports = logEvents;
