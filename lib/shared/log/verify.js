'use strict';

var log = require('gulplog');

var msgs = require('./messages');
var exit = require('../exit');

function logVerify(blacklisted) {
  var pluginNames = Object.keys(blacklisted);

  if (!pluginNames.length) {
    log.info(msgs.info.verifyOk);
    exit(0);
  }

  log.warn(msgs.warn.verifyBad, pluginNames.map(function(pluginName) {
    var reason = blacklisted[pluginName];
    return pluginName + ': ' + reason;
  }).join('\n'));

  exit(1);
}

module.exports = logVerify;
