'use strict';

var fancyLog = require('fancy-log');

var levels = [
  'info',
  'error',
  'warn',
  'debug',
];

function toConsole(log) {
  levels.forEach(function(level) {
    log.on(level, fancyLog);
  });
}

module.exports = toConsole;
