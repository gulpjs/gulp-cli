'use strict';

var copyProps = require('copy-props');

var fromto = {
  'flags.silent': 'silent',
};

function mergeConfigToCliFlags(opt, config) {
  opt = copyProps(opt, {});
  return copyProps(config, opt, fromto);
}

module.exports = mergeConfigToCliFlags;
