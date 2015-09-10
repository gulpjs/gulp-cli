'use strict';

var fancyLog = require('fancy-log');

// The sorting of the levels is
// significant.
var levels = [
  'debug', // Logs all levels.
  'info',  // Logs info, warn and error.
  'warn',  // Logs warn and error.
  'error', // Logs error.
];

function toConsole(log, opts) {
  var levelsToListen = levels.map(function(cur, i) {
    var logLevelIndex;

    if (cur === opts.logLevel) {
      logLevelIndex = i;
      return cur;
    } else if (i > logLevelIndex) {
      return cur;
    }
  });

  levelsToListen.forEach(function(level) {
    log.on(level, fancyLog);
  });
}

module.exports = toConsole;
