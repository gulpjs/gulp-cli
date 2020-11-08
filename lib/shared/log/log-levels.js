'use strict';

/* istanbul ignore next */
function noop() {}

// The sorting of the levels is
// significant.
var levels = [
  'error', // -L: Logs error events.
  'warn',  // -LL: Logs warn and error events.
  'info',  // -LLL: Logs info, warn and error events.
  'debug', // -LLLL: Logs all log levels.
];

function setLogLevels(log, opts) {
  // Return immediately if logging is
  // not desired.
  if (opts.tasksSimple || opts.tasksJson || opts.help || opts.version || opts.silent) {
    // Keep from crashing process when silent.
    log.on('error', noop);
    return;
  }

  // Default loglevel to info level (3).
  var loglevel = opts.logLevel || 3;

  levels
    .filter(function(item, i) {
      return i < loglevel;
    })
    .forEach(function(level) {
      if (level === 'error') {
        log.on(level, consoleError);
      } else {
        log.on(level, consoleLog);
      }
    });
}

function consoleError(s) {
  if (s) {
    console.error(s);
  }
}

function consoleLog(s) {
  if (s) {
    console.log(s);
  }
}

module.exports = setLogLevels;
