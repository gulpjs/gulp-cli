'use strict';

var fs = require('fs');
var path = require('path');
// var format = require('theming-log').format;

// var theme = require('./log/theme');
// var msgs = require('./log/messages');

module.exports = function(name) {
  if (typeof name !== 'string') {
    // throw new Error(format(theme, msgs.error.noCompletionType));
  }
  var file = path.join(__dirname, '../../completion', name);
  try {
    console.log(fs.readFileSync(file, 'utf8'));
    process.exit(0);
  } catch (err) {
    // console.log(format(theme, msgs.error.unknownCompletionType, name));
    process.exit(5);
  }
};
