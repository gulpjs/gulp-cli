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
  var levelsToListen = levels;

  if (opts.tasksSimple) {
    return;
  }

  if (opts.logLevel) {
    levelsToListen = levels.slice(levels.indexOf(opts.logLevel));
  }

  levelsToListen.forEach(function(level) {
    log.on(level, fancyLog);
  });
}

module.exports = toConsole;
