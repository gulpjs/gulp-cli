'use strict';

var path = require('path');
var logger = require('fancy-log');
var chalk = require('chalk');

module.exports = {

  description: function(value, configFile) {
    if (typeof value !== 'string') {
      logger.error(chalk.red(
        configFile + ': config.description must be a string: ' + value));
      return undefined;
    }
    if (!value.length) {
      logger.error(chalk.red(
        configFile + ': config.description requires a value.'));
      return undefined;
    }
    return value;
  },

  'flags.silent': function(value, configFile) {
    if (typeof value !== 'boolean') {
      logger.error(chalk.red(
        configFile + ': config.flags.silent must be a boolean: ' + value));
      return undefined;
    }
    return value;
  },

  'flags.gulpfile': function(value, configFile) {
    if (typeof value !== 'string') {
      logger.error(chalk.red(
        configFile + ': config.flags.gulpfile must be a string: ' + value));
      return undefined;
    }
    if (!value.length) {
      logger.error(chalk.red(
        configFile + ': config.flags.gulpfile requires a value.'));
      return undefined;
    }
    return path.resolve(path.dirname(configFile), value);
  },
};
