'use strict';

var copyProps = require('copy-props');

var fromTo = {
  'flags.silent': 'silent',
};

function mergeConfigToCliFlags(opt, config) {
  return copyProps(config, opt, fromTo);
}

module.exports = mergeConfigToCliFlags;
