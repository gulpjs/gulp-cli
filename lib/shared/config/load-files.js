'use strict';

var copyProps = require('copy-props');
var path = require('path');

function loadConfigFiles(configFiles, configFileOrder) {
  var config = {};

  configFileOrder.forEach(loadFile);

  function loadFile(key) {
    var filePath = configFiles[key];
    if (!filePath) {
      return;
    }

    copyProps(require(filePath), config, convert);

    function convert(srcInfo) {
      if (srcInfo.keyChain === 'flags.gulpfile') {
        return path.resolve(path.dirname(filePath), srcInfo.value);
      }
      return srcInfo.value;
    }
  }

  return config;
}

module.exports = loadConfigFiles;
