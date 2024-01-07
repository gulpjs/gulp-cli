'use strict';

var copyProps = require('copy-props');
var path = require('path');

function mergeConfigs(env) {
  var cfg = {};
  if (env.configFiles.userHome) {
    copyConfig(env.config.userHome, cfg, env.configFiles.userHome);
  }
  if (env.configFiles.project) {
    copyConfig(env.config.project, cfg, env.configFiles.project);
  }
  return cfg;
}

function copyConfig(src, dest, filePath) {
  return copyProps(src, dest, convert);

  function convert(loadedInfo) {
    if (loadedInfo.keyChain === 'flags.gulpfile') {
      return path.resolve(path.dirname(filePath), loadedInfo.value);
    }
    return loadedInfo.value;
  }
}

module.exports = mergeConfigs;
