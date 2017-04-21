'use strict';

var copyProps = require('copy-props');
var convertConfig = require('./convert-config');
var excludeCliArgs = require('./exclude-cli-args');

function loadConfigFiles(configFiles, configFileOrder) {
  var config = {};

  configFileOrder.forEach(function(key) {
    var filePath = configFiles[key];
    if (!filePath) {
      return;
    }

    copyProps(require(filePath), config, function(value, name) {
      if (value == null) {
        return undefined;
      }
      var convert = convertConfig[name];
      if (typeof convert !== 'function') {
        return value;
      }
      return convert(value, filePath);
    });
  });

  config = excludeCliArgs(config);

  return config;
}

module.exports = loadConfigFiles;
