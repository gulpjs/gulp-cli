'use strict';

var log = require('gulplog');

var chalk = require('chalk');
var exit = require('../exit');

function logVerify(blacklisted) {
  var pluginNames = Object.keys(blacklisted);

  if (!pluginNames.length) {
    log.info(
      chalk.green('There are no blacklisted plugins in this project')
    );
    exit(0);
  }

  log.warn(chalk.red('Blacklisted plugins found in this project:'));

  pluginNames.map(function(pluginName) {
    var reason = blacklisted[pluginName];
    log.warn(chalk.bgRed(pluginName) + ': ' + reason);
  });

  exit(1);
}

module.exports = logVerify;
