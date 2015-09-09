'use strict';

var chalk = require('chalk');
var dateformat = require('dateformat');

var levels = [
  'info',
  'error',
  'warn',
  'debug',
];

function shellOut() {
  var time = '[' + chalk.grey(dateformat(new Date(), 'HH:MM:ss')) + ']';
  process.stdout.write(time + ' ');
  console.log.apply(console, arguments);
}

function toConsole(log) {
  levels.forEach(function(level) {
    log.on(level, shellOut);
  });
}

module.exports = toConsole;
