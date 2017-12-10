'use strict';

var log = require('gulplog');
var prettyTime = require('pretty-hrtime');

var formatError = require('../formatError');
var color = require('../../../shared/colorize');

// Wire up logging events
function logEvents(gulpInst) {

  var loggedErrors = [];

  gulpInst.on('start', function(evt) {
    // TODO: batch these
    // so when 5 tasks start at once it only logs one time with all 5
    var level = evt.branch ? 'debug' : 'info';
    log[level]('Starting', '\'' + color.task(evt.name) + '\'...');
  });

  gulpInst.on('stop', function(evt) {
    var time = prettyTime(evt.duration);
    var level = evt.branch ? 'debug' : 'info';
    log[level](
      'Finished', '\'' + color.task(evt.name) + '\'',
      'after', color.highlight(time)
    );
  });

  gulpInst.on('error', function(evt) {
    var msg = formatError(evt);
    var time = prettyTime(evt.duration);
    var level = evt.branch ? 'debug' : 'error';
    log[level](
      '\'' + color.task(evt.name) + '\'',
      color.error('errored after'),
      color.highlight(time)
    );

    // If we haven't logged this before, log it and add to list
    if (loggedErrors.indexOf(evt.error) === -1) {
      log.error(msg);
      loggedErrors.push(evt.error);
    }
  });
}

module.exports = logEvents;
