'use strict';

var path = require('path');
var chalk = require('chalk');
var copyProps = require('copy-props');

var mergeCliOpts = require('./cli-flags');
var messages = require("../../../messages");

var toEnvFromConfig = {
  configPath: 'flags.gulpfile',
  configBase: 'flags.gulpfile',
  preload: 'flags.preload',
  nodeFlags: 'flags.nodeFlags',
};

function overrideEnvConfig(env, config, cliOpts) {
  cliOpts = mergeCliOpts(cliOpts, config);

  // This must reverse because `flags.gulpfile` determines 2 different properties
  var reverse = true;
  env = copyProps(env, config, toEnvFromConfig, convert, reverse);

  env.config = {
    flags: cliOpts,
  };
  env.config.flags.getMessage = function(msg, data) {
    if (msg === messages.PRELOAD_BEFORE) {
      return 'Preloading external module: ' + chalk.magenta(data);
    }

    if (msg === messages.PRELOAD_SUCCESS) {
      return 'Preloaded external module: ' + chalk.magenta(data)
    }

    if (msg === messages.PRELOAD_FAILURE) {
      return chalk.yellow('Failed to preload external module: ') + chalk.magenta(data);
    }

    if (msg === messages.PRELOAD_ERROR) {
      return chalk.yellow(data.toString());
    }

    if (msg === messages.LOADER_SUCCESS) {
      return 'Loaded external module: ' + chalk.magenta(data);
    }

    if (msg === messages.LOADER_FAILURE) {
      return chalk.yellow('Failed to load external module: ') + chalk.magenta(data);
    }

    if (msg === messages.LOADER_ERROR) {
      return chalk.yellow(data.toString());
    }

    if (msg === messages.NODE_FLAGS) {
      var nodeFlags = chalk.magenta(data.join(', '));
      return 'Node flags detected: ' + nodeFlags;
    }

    if (msg === messages.RESPAWNED) {
      var pid = chalk.magenta(data);
      return 'Respawned to PID: ' + pid;
    }

    if (msg === messages.GULPFILE_NOT_FOUND) {
      return chalk.red('No gulpfile found');
    }

    if (msg === messages.CWD_CHANGED) {
      return 'Working directory changed to ' + chalk.magenta(data);
    }

    if (msg === messages.UNSUPPORTED_GULP_VERSION) {
      return chalk.red('Unsupported gulp version', env.modulePackage.version)
    }

    if (msg === messages.BOX_DRAWINGS_LIGHT_UP_AND_RIGHT) {
      return chalk.white('└');
    }

    if (msg === messages.BOX_DRAWINGS_LIGHT_VERTICAL_AND_RIGHT) {
      return chalk.white('├');
    }

    if (msg === messages.BOX_DRAWINGS_LIGHT_HORIZONTAL) {
      return chalk.white('─');
    }

    if (msg === messages.BOX_DRAWINGS_LIGHT_DOWN_AND_HORIZONTAL) {
      return chalk.white('┬');
    }

    if (msg === messages.BOX_DRAWINGS_LIGHT_VERTICAL) {
      return chalk.white('│');
    }
  };
  if (config.description) {
    env.config.description = config.description;
  }
  return env

  function convert(configInfo, envInfo) {
    if (envInfo.keyChain === 'configBase') {
      if (cliOpts.gulpfile === undefined) {
        return path.dirname(configInfo.value);
      }
      return;
    }

    if (envInfo.keyChain === 'configPath') {
      if (cliOpts.gulpfile === undefined) {
        return configInfo.value;
      }
      return;
    }

    if (envInfo.keyChain === 'preload') {
      return [].concat(envInfo.value, configInfo.value);
    }

    /* istanbul ignore else */
    if (envInfo.keyChain === 'nodeFlags') {
      return [].concat(configInfo.value || []);
    }
  }
}

module.exports = overrideEnvConfig;
