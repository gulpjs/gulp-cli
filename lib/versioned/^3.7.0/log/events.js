'use strict';

var log = require('gulplog');
var prettyTime = require('pretty-hrtime');

var ansi = require('../../../shared/ansi');
var exit = require('../../../shared/exit');
var formatError = require('../format-error');

// Wire up logging events
function logEvents(gulpInst) {

  // Exit with 0 or 1
  var failed = false;
  var tasks = [];

  process.once('exit', function(code) {
    if (tasks.length) {
      failed = true;

      log.warn(
        ansi.red('The following tasks did not complete:'),
        ansi.cyan(tasks.join(', '))
      );
      log.warn(
        ansi.red('Did you forget to signal async completion?')
      );
    }

    if (code === 0 && failed) {
      exit(1);
    }
  });

  // Total hack due to poor error management in orchestrator
  gulpInst.on('err', function() {
    failed = true;
  });

  gulpInst.on('task_start', function(e) {
    tasks.push(e.task);

    // TODO: batch these
    // so when 5 tasks start at once it only logs one time with all 5
    log.info('Starting', '\'' + ansi.cyan(e.task) + '\'...');
  });

  gulpInst.on('task_stop', function(e) {
    var time = prettyTime(e.hrDuration);
    log.info(
      'Finished', '\'' + ansi.cyan(e.task) + '\'',
      'after', ansi.magenta(time)
    );

    var foundIndex = tasks.indexOf(e.task);
    /* istanbul ignore else */
    if (foundIndex >= 0) {
      tasks.splice(foundIndex, 1);
    }
  });

  gulpInst.on('task_err', function(e) {
    var msg = formatError(e);
    var time = prettyTime(e.hrDuration);
    log.error(
      '\'' + ansi.cyan(e.task) + '\'',
      ansi.red('errored after'),
      ansi.magenta(time)
    );
    log.error(msg);
  });

  gulpInst.on('task_not_found', function(err) {
    log.error(
      ansi.red('Task \'' + err.task + '\' is not in your gulpfile')
    );
    log.error('Please check the documentation for proper gulpfile formatting');
    exit(1);
  });
}

module.exports = logEvents;
