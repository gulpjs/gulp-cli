'use strict';

var path = require('path');
var copyProps = require('copy-props');

var toFrom = {
  configPath: 'flags.gulpfile',
  configBase: 'flags.gulpfile',
};

function mergeConfigToEnvFlags(env, config) {
  return copyProps(env, config, toFrom, convert, true);
}

function convert(srcInfo, dstInfo) {
  if (dstInfo.keyChain === 'configBase') {
    return path.dirname(srcInfo.value);
  }
  return srcInfo.value;
}

module.exports = mergeConfigToEnvFlags;
