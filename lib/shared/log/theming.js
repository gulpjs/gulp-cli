'use strict';

var themingLog = require('theming-log');
var timestamp = require('time-stamp');
var theme = require('./theme');
var ansi = require('../ansi');

theme.NOW = timestamp;

Object.keys(ansi).forEach(function(name) {
  theme[name] = ansi[name];
});

function setLogTheme(log, theme) {
  ['error', 'warn', 'info', 'debug'].forEach(function(level) {
    log[level] = themingLog(theme, log[level]);
  });
}

module.exports = setLogTheme;
