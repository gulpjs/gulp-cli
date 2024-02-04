'use strict';

var log = require('gulplog');
var formatTime = require('../../../shared/log/format-hrtime');
var msgs = require('../../../shared/log/messages');
var exit = require('../../../shared/exit');
var formatError = require('../format-error');

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
    log.info(msgs.info.taskStart, e.task);
  });

  gulpInst.on('task_stop', function(e) {
    var time = formatTime(e.hrDuration);
    log.info(msgs.info.taskStop, e.task, time);
  });

  gulpInst.on('task_err', function(e) {
    var msg = formatError(e);
    var time = formatTime(e.hrDuration);
    log.error(msgs.error.taskError, e.task, time, Boolean(msg), msg);
  });

  gulpInst.on('task_not_found', function(err) {
    log.error(msgs.error.taskNotFound, err.task);
    exit(1);
  });
}

module.exports = logEvents;
