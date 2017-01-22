'use strict';

var path = require('path');
var copyProps = require('copy-props');

var fromto = {
  configPath: 'flags.gulpfile',
  configBase: 'flags.gulpfile',
};

function mergeConfigToEnvFlags(env, config) {
  env = copyProps(env, {});
  return copyProps(env, config, fromto, convert, true);
}

function convert(value, configKey, envKey) {
  if (envKey === 'configBase') {
    return path.dirname(value);
  }
  return value;
}

module.exports = mergeConfigToEnvFlags;
