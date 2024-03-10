'use strict';

var fancyLog = require('fancy-log');

/* istanbul ignore next */
function noop() {}

function toConsole(log, opts) {
  // Return immediately if logging is
  // not desired.
  if (opts.tasksSimple || opts.tasksJson || opts.help || opts.version || opts.silent) {
    // Keep from crashing process when silent.
    log.on('error', noop);
    return;
  }

  // Default loglevel to info level (3).
  var loglevel = opts.logLevel || 3;

  // -L: Logs error events.
  if (loglevel > 0) {
    log.on('error', function (sym, data) {
      var msg = opts.getMessage.call(null, sym, data);
      // Users can filter messages by explicitly returning `false`
      if (msg === false) {
        return;
      }
      // If nothing is returned, we log the original message directly
      if (typeof msg === 'undefined') {
        fancyLog.error(arguments[0]);
        return;
      }

      fancyLog.error(msg);
    });
  }

  // -LL: Logs warn and error events.
  if (loglevel > 1) {
    log.on('warn', function(sym, data) {
      var msg = opts.getMessage.call(null, sym, data);
      // Users can filter messages by explicitly returning `false`
      if (msg === false) {
        return;
      }
      // If nothing is returned, we log the original message directly
      if (typeof msg === 'undefined') {
        fancyLog.apply(null, arguments);
        return;
      }

      fancyLog(msg)
    });
  }

  // -LLL: Logs info, warn and error events.
  if (loglevel > 2) {
    log.on('info', function(sym, data) {
      var msg = opts.getMessage.call(null, sym, data);
      // Users can filter messages by explicitly returning `false`
      if (msg === false) {
        return;
      }
      // If nothing is returned, we log the original message directly
      if (typeof msg === 'undefined') {
        fancyLog.apply(null, arguments)
        return;
      }

      fancyLog(msg)
    })
  }

  if (loglevel > 3) {
    log.on('debug', function(sym, data) {
      var msg = opts.getMessage.call(null, sym, data);
      // Users can filter messages by explicitly returning `false`
      if (msg === false) {
        return;
      }
      // If nothing is returned, we log the original message directly
      if (typeof msg === 'undefined') {
        fancyLog.apply(null, arguments)
        return;
      }

      fancyLog(msg)
    })
  }
}

module.exports = toConsole;
