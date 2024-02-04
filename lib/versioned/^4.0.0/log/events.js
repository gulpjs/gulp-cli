'use strict';

var log = require('gulplog');
var formatTime = require('../../../shared/log/format-hrtime');
var msgs = require('../../../shared/log/messages');
var formatError = require('../format-error');

// Wire up logging events
function logEvents(gulpInst) {

  var loggedErrors = [];

  gulpInst.on('start', function(evt) {
    /* istanbul ignore next */
    // TODO: batch these
    // so when 5 tasks start at once it only logs one time with all 5
    var level = evt.branch ? 'debug' : 'info';
    log[level](msgs.info.taskStart, evt.name);
  });

  gulpInst.on('stop', function(evt) {
    var time = formatTime(evt.duration);
    /* istanbul ignore next */
    var level = evt.branch ? 'debug' : 'info';
    log[level](msgs.info.taskStop, evt.name, time);
  });

  gulpInst.on('error', function(evt) {
    var msg = formatError(evt);
    var firstOutput = false;

    // If we haven't logged this before, log it and add to list
    if (loggedErrors.indexOf(evt.error) === -1) {
      firstOutput = true;
      loggedErrors.push(evt.error);
    }

    var time = formatTime(evt.duration);
    var level = evt.branch ? 'debug' : 'error';
    log[level](msgs.error.taskError, evt.name, time, firstOutput, msg);
  });
}

module.exports = logEvents;
