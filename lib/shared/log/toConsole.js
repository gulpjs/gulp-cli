'use strict';

var fancyLog = require('fancy-log');

// The sorting of the levels is
// significant.
var levels = [
  'error', // -l: Logs error events.
  'warn',  // -ll: Logs warn and error events.
  'info',  // -lll: Logs info, warn and error events.
  'debug', // -llll: Logs all log levels.
];

function toConsole(log, opts) {
  // Return immediately if logging is
  // not desired.
  if (opts.tasksSimple || opts.silent) {
    return;
  }

  var levelsToListen = [];
  var loglevel = 3;

  // For some reason yargs sets
  // the default count for opts.loglevel to 2
  // instead of 0 when we configure count: true
  // in the cliOptions.
  if (opts.loglevel > 2) {
    loglevel = opts.loglevel - 2;
  }

  levelsToListen = levels.slice(0, loglevel);

  levelsToListen.forEach(function(level) {
    if (level === 'error') {
      log.on(level, fancyLog.error);
    } else {
      log.on(level, fancyLog);
    }
  });
}

module.exports = toConsole;
