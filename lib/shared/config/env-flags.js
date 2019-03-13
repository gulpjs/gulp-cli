'use strict';

var path = require('path');
var copyProps = require('copy-props');

var toFrom = {
  configPath: 'flags.gulpfile',
  configBase: 'flags.gulpfile',
  require: 'flags.require',
};

function mergeConfigToEnvFlags(env, config) {
  return copyProps(env, config, toFrom, convert, true);
}

function convert(configInfo, envInfo) {
  if (envInfo.keyChain === 'configBase') {
    return path.dirname(configInfo.value);
  }
  if (envInfo.keyChain === 'require') {
    return [].concat(envInfo.value, configInfo.value);
  }
  return configInfo.value;
}

module.exports = mergeConfigToEnvFlags;
