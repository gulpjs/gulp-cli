'use strict';

var copyProps = require('copy-props');

var fromTo = {
  'flags.silent': 'silent',
  'flags.continue': 'continue',
  'flags.logLevel': 'logLevel',
};

function mergeConfigToCliFlags(opt, config) {
  return copyProps(config, opt, fromTo);
}

module.exports = mergeConfigToCliFlags;
