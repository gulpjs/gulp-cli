'use strict';

var yargs = require('yargs');
var camelCase = require('lodash.camelcase');

function mergeToCliFlags(cliFlags, config, cliOptions) {
  var argv = yargs(process.argv.slice(2)).argv;
  var cfgFlags = config.flags || {};

  var optNames = ['silent'];
  optNames.filter(excludeArgsByUser).map(camelCase).forEach(copyConfig);

  function excludeArgsByUser(name) {
    return !(argv[name] != null || argv[cliOptions[name].alias] != null);
  }

  function copyConfig(name) {
    if (cfgFlags[name] !== undefined) {
      cliFlags[name] = cfgFlags[name];
    }
  }
}

module.exports = mergeToCliFlags;
