'use strict';

var ansi = require('ansi-colors');
var supportsColors = require('color-support');

var colors = {
  desc: ansi.gray, // TODO: name helpDesc?
  success: ansi.green,
  warning: ansi.red, // TODO: change the warning color?
  error: ansi.red,
  highlightError: ansi.bgRed,

  highlight: ansi.magenta,

  task: ansi.cyan, // TODO: task or taskName?

  // TODO: The gulpfile description stuff should be grouped somehow
  taskDesc: ansi.white,
  flag: ansi.magenta,
  flagDesc: ansi.white,
  childTask: ansi.white,
  treeBranch: ansi.white,

  helpUsage: ansi.bold, // TODO: how can we remove this?
  helpOptions: ansi.blue, // TODO: use highlight for this?
};

function noop(str) {
  return str;
}

function config(useColors) {
  if (useColors === false || supportsColors() === false) {
    colors.desc = noop;
    colors.success = noop;
    colors.warning = noop;
    colors.error = noop;
    colors.highlightError = noop;
    colors.highlight = noop;
    colors.task = noop;
    colors.taskDesc = noop;
    colors.flag = noop;
    colors.flagDesc = noop;
    colors.childTask = noop;
    colors.treeBranch = noop;
    colors.helpUsage = noop;
    colors.helpOptions = noop;
  }
}

module.exports = colors;
module.exports.configure = config;
