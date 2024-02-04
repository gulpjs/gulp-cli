'use strict';

var chalk = require('chalk');
var timestamp = require('./timestamp');

var theme = {
  NOW: timestamp,

  HELP: {
    DESC: '{gray: {1}}',
  },

  DESC: null,
  PATH: '{magenta: {1}}',
  PID: '{magenta: {1}}',
  MODULE: '{magenta: {1}}',
  VERSION: null,
  TITLE: '{bold: {1}}',
  TASK: '{cyan: {1}}',
  OPTION: '{blue: {1}}',
  DURATION: '{magenta: {1}}',

  TASKS: {
    BRANCH: null,
    NAME: '{TASK: {1}}',
    OPTION: '{OPTION: {1}}',
    DESC: '{DESC: {1}}',
    CHILD: null,
  },

  INFO: null,
  WARN: '{yellow: {1}}',
  ERROR: '{red: {1}}',

  TIMESTAMP: '[{gray: {NOW: HH:mm:ss}}] ',

  IF: function(text) {
    var idx = text.indexOf('?');
    var cond = text.substring(0, idx).trim();
    if (cond === '' || cond === 'false') {
      return '';
    }
    return text.slice(idx + 1);
  },
};

[
  'reset', 'bold', 'dim', 'italic', 'underline', 'inverse',
  'hidden', 'strikethrough', 'visible',

  'black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white',
  'blackBright', 'gray', 'grey', 'redBright', 'greenBright', 'yellowBright',
  'blueBright', 'magentaBright', 'cyanBright', 'whiteBright',

  'bgBlack', 'bgRed', 'bgGreen', 'bgYellow', 'bgBlue', 'bgMagenta', 'bgCyan',
  'bgWhite', 'bgBlackBright', 'bgGray', 'bgGrey', 'bgRedBright',
  'bgGreenBright', 'bgYellowBright', 'bgBlueBright', 'bgMagentaBright',
  'bgCyanBright', 'bgWhiteBright',
].forEach(function(style) {
  theme[style] = chalk[style];
});

module.exports = theme;
