'use strict';

var log = require('gulplog');
var prettyTime = require('pretty-hrtime');

var exit = require('../../../shared/exit');
var color = require('../../../shared/colorize');
var formatError = require('../formatError');

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
    log.info('Starting', '\'' + color.task(e.task) + '\'...');
  });

  gulpInst.on('task_stop', function(e) {
    var time = prettyTime(e.hrDuration);
    log.info(
      'Finished', '\'' + color.task(e.task) + '\'',
      'after', color.highlight(time)
    );
  });

  gulpInst.on('task_err', function(e) {
    var msg = formatError(e);
    var time = prettyTime(e.hrDuration);
    log.error(
      '\'' + color.task(e.task) + '\'',
      color.error('errored after'),
      color.highlight(time)
    );
    log.error(msg);
  });

  gulpInst.on('task_not_found', function(err) {
    log.error(
      color.error('Task \'' + err.task + '\' is not in your gulpfile')
    );
    log.error('Please check the documentation for proper gulpfile formatting');
    exit(1);
  });
}

module.exports = logEvents;
