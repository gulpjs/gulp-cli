'use strict';

var path = require('path');

function mergeToEnvFlags(envFlags, config, envOpts) {
  var cfgFlags = config.flags || {};

  if (!envOpts.configPath && cfgFlags.gulpfile) {
    envFlags.configPath = cfgFlags.gulpfile;
    envFlags.configBase = path.dirname(cfgFlags.gulpfile);
  }
}

module.exports = mergeToEnvFlags;
