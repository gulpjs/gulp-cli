'use strict';

var log = require('gulplog');
var formatTime = require('../../../shared/log/format-hrtime');
var formatError = require('../format-error');

// TODO: make into `@gulpjs/messages`
var messages = require('../../../../messages');

// Wire up logging events
function logEvents(gulpInst) {

  var loggedErrors = [];

  gulpInst.on('start', function(evt) {
    /* istanbul ignore next */
    // TODO: batch these
    // so when 5 tasks start at once it only logs one time with all 5
    var level = evt.branch ? 'debug' : 'info';
    log[level](messages.TASK_START, { task: evt.name });
  });

  gulpInst.on('stop', function(evt) {
    var time = formatTime(evt.duration);
    /* istanbul ignore next */
    var level = evt.branch ? 'debug' : 'info';
    log[level](messages.TASK_STOP, { task: evt.name, duration: time });
  });

  gulpInst.on('error', function(evt) {
    var msg = formatError(evt);
    var time = formatTime(evt.duration);
    var level = evt.branch ? 'debug' : 'error';
    log[level](messages.TASK_ERROR, { task: evt.name, duration: time });

    // If we haven't logged this before, log it and add to list
    if (loggedErrors.indexOf(evt.error) === -1) {
      log.error(msg);
      loggedErrors.push(evt.error);
    }
  });
}

module.exports = logEvents;
