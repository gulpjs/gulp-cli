'use strict';

var format = require('theming-log').format;
var theme = require('../log/theme');
var msgs = require('../log/messages');

function makeHelp(parser) {
  parser.usage(format(theme, msgs.help.usage));

  Object.keys(msgs.help.flags).forEach(function(flag) {
    parser.describe(flag, format(theme, msgs.help.flags[flag]));
  });

  return parser;
}

module.exports = makeHelp;
