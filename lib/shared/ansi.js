'use strict';

var red = require('ansi-red');
var green = require('ansi-green');
var blue = require('ansi-blue');
var magenta = require('ansi-magenta');
var cyan = require('ansi-cyan');
var white = require('ansi-white');
var gray = require('ansi-gray');
var bgred = require('ansi-bgred');
var bold = require('ansi-bold');
var hasFlag = require('has-flag');

module.exports = {
  red: colorize() ? red : noColor,
  green: colorize() ? green : noColor,
  blue: colorize() ? blue : noColor,
  magenta: colorize() ? magenta : noColor,
  cyan: colorize() ? cyan : noColor,
  white: colorize() ? white : noColor,
  gray: colorize() ? gray : noColor,
  bgred: colorize() ? bgred : noColor,
  bold: colorize() ? bold : noColor,
};

function noColor(message) {
  return message;
}

function colorize() {
  var noColorFlag =
    hasFlag('no-color') || hasFlag('no-colors') || hasFlag('color=false');
  var isTTY = process.stdout && process.stdout.isTTY;
  var colorOutput = !noColorFlag && isTTY;
  return colorOutput;
}
