'use strict';

var eraseLapse = require('./erase-lapse');
var eraseTime = require('./erase-time');

function sliceLines(text, start, end) {
  text = eraseLapse(eraseTime(text));
  return text.split('\n').slice(start, end).join('\n');
}

module.exports = sliceLines;
