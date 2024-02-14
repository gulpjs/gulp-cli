'use strict';

var chalk = require('chalk');
var fancyLog = require('fancy-log');

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

function cleanup(log) {
  levels.forEach(removeListeners);

  function removeListeners(level) {
    if (level === 'error') {
      log.removeListener(level, noop);
      log.removeListener(level, onError);
      log.removeListener(level, onErrorDeprecated);
    } else {
      log.removeListener(level, onLog);
      log.removeListener(level, onLogDeprecated);
    }
  }
}

var deprecatedPrinted = false;

function onError(msg) {
  fancyLog.error(msg);
}

function onErrorDeprecated(msg) {
  if (!deprecatedPrinted) {
    fancyLog(chalk.yellow("gulplog v1 is deprecated. Please help your plugins update!"));
    deprecatedPrinted = true;
  }
  fancyLog.error(msg);
}

function onLog(msg) {
  fancyLog(msg);
}

function onLogDeprecated(msg) {
  if (!deprecatedPrinted) {
    fancyLog(chalk.yellow("gulplog v1 is deprecated. Please help your plugins update!"));
    deprecatedPrinted = true;
  }
  fancyLog(msg);
}

function toConsole(log, opts, deprecated) {
  // Remove previous listeners to enable to call this twice.
  cleanup(log);

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
        log.on(level, deprecated ? onErrorDeprecated : onError);
      } else {
        log.on(level, deprecated ? onLogDeprecated : onLog);
      }
    });
}

module.exports = toConsole;
