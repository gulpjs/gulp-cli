'use strict';

var log = require('gulplog');
var formatTime = require('../../../shared/log/format-hrtime');
var exit = require('../../../shared/exit');
var formatError = require('../format-error');

// TODO: make into `@gulpjs/messages`
var messages = require('../../../../messages');

// Wire up logging events
function logEvents(gulpInst) {

  // Exit with 0 or 1
  var failed = false;
  process.once('exit', function(code) {
    if (code === 0 && failed) {
      exit(1);
    }
  });

  // Total hack due to poor error management in orchestrator
  gulpInst.on('err', function() {
    failed = true;
  });

  gulpInst.on('task_start', function(e) {
    // TODO: batch these
    // so when 5 tasks start at once it only logs one time with all 5
    log.info(messages.TASK_START, { task: e.task });
  });

  gulpInst.on('task_stop', function(e) {
    var time = formatTime(e.hrDuration);
    log.info(messages.TASK_STOP, { task: e.task, duration: time });
  });

  gulpInst.on('task_err', function(e) {
    var msg = formatError(e);
    var time = formatTime(e.hrDuration);
    log.error(messages.TASK_ERROR, { task: e.task, duration: time });
    log.error(msg);
  });

  gulpInst.on('task_not_found', function(err) {
    log.error(messages.TASK_MISSING, { task: err.task });
    exit(1);
  });
}

module.exports = logEvents;
