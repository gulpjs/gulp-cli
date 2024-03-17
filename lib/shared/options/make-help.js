'use strict';

var cliOptions = require('./cli-options');

// TODO: make into `@gulpjs/messages`
var messages = require("../../../messages");

function makeHelp(parser, translate) {
  var usage = translate.message(messages.USAGE);
  if (usage) {
    parser.usage(usage);
  }

  Object.keys(cliOptions).forEach(function (flag) {
    var opt = cliOptions[flag];
    var description = translate.message(opt.message);
    if (description) {
      parser.describe(flag, description);
    }
  });

  return parser;
}

module.exports = makeHelp;
