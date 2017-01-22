'use struct';

var yargs = require('yargs');
var camelCase = require('camelcase');
var copyProps = require('copy-props');
var cliOptions = require('../cliOptions');

function excludeCliArgs(config) {
  var argv = yargs(process.argv.slice(2)).argv;

  var excludedNames = Object.keys(cliOptions)
    .filter(isSpecified)
    .map(toConfigName);

  return copyProps(config, {}, exclude);


  function isSpecified(name) {
    return (argv[name] != null || argv[cliOptions[name].alias] != null);
  }

  function exclude(value, name) {
    if (excludedNames.indexOf(name) >= 0) {
      return undefined;
    }
    return value;
  }
}

function toConfigName(name) {
  return 'flags.' + camelCase(name);
}

module.exports = excludeCliArgs;
