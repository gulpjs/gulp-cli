'use strict';

var log = require('gulplog');

var exit = require('../exit');
var color = require('../colorize');

function logVerify(blacklisted) {
  var pluginNames = Object.keys(blacklisted);

  if (!pluginNames.length) {
    log.info(
      color.success('There are no blacklisted plugins in this project')
    );
    exit(0);
  }

  log.warn(color.error('Blacklisted plugins found in this project:'));

  pluginNames.map(function(pluginName) {
    var reason = blacklisted[pluginName];
    log.warn(color.highlightError(pluginName) + ': ' + reason);
  });

  exit(1);
}

module.exports = logVerify;
