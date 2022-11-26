'use strict';

var copyProps = require('copy-props');
var path = require('path');

function normalizeConfig(config, filePath) {
  return copyProps(config, {}, convert);

  function convert(loadedInfo) {
    if (loadedInfo.keyChain === 'flags.gulpfile') {
      return path.resolve(path.dirname(filePath), loadedInfo.value);
    }
    return loadedInfo.value;
  }
}

module.exports = normalizeConfig;
