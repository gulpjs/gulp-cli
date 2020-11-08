'use strict';

var themingFormat = require('theming-log').format;
var theme = require('./theme');
var msgs = require('./messages');

function makeHelp(parser) {
  parser.usage(themingFormat(theme, msgs.help.usage));

  Object.keys(msgs.help.flags).forEach(function(flag) {
    parser.describe(flag, themingFormat(theme, msgs.help.flags[flag]));
  });

  return parser;
}

module.exports = makeHelp;
