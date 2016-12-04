'use strict';

var get = require('lodash.get');
var set = require('lodash.set');
var isString = require('lodash.isstring');
var configSpecs = require('./cfg-specs');

function loadConfigFiles(configFilesBase, keysInOrder) {
  var config = {};

  var configFilePaths = keysInOrder.map(function(key) {
    return configFilesBase[key];
  }).filter(isString);

  configFilePaths.forEach(function(filePath) {
    var loadedCfg = require(filePath);

    Object.keys(configSpecs).forEach(function(keyPath) {
      var spec = configSpecs[keyPath];

      var value = get(loadedCfg, keyPath);
      if (value === undefined) {
        return;
      }

      set(config, keyPath, spec.validate(value, filePath));
    });
  });

  return config;
}

module.exports = loadConfigFiles;
