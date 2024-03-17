'use strict';

var fs = require('fs');
var path = require('path');

// TODO: make into `@gulpjs/messages`
var messages = require('../../messages');

module.exports = function(name, translate) {
  if (typeof name !== 'string') {
    throw new Error(translate.message(messages.COMPLETION_TYPE_MISSING));
  }
  var file = path.join(__dirname, '../../completion', name);
  try {
    console.log(fs.readFileSync(file, 'utf8'));
    process.exit(0);
  } catch (err) {
    console.log(translate.message(messages.COMPLETION_TYPE_UNKNOWN, { name: name }));
    process.exit(5);
  }
};
