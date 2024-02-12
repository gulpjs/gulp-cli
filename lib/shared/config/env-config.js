'use strict';

var path = require('path');
var copyProps = require('copy-props');

var mergeCliOpts = require('./cli-flags');

var theme = require('../log/theme');
var msgs = require('../log/messages');

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
    log: {
      theme: theme,
      msgs: msgs,
    },
  };
  if (config.description) {
    env.config.description = config.description;
  }
  if (config.log) {
    if (config.log.theme) {
      copyProps(config.log.theme, env.config.log.theme);
    }
    if (config.log.msgs) {
      copyProps(config.log.msgs, env.config.log.msgs);
    }
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
