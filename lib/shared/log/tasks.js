'use strict';

var archy = require('archy');
var chalk = require('chalk');
var gutil = require('gulp-util');

function logTasks(tree, getDescription) {
  var padding = 0;
  var rdependency = /[ │] [├└]/;
  archy(tree)
    .split('\n')
    .filter(function(v, i) {
      // Log first line as is
      if (i === 0) {
        gutil.log(v);
        return false;
      }
      // Search for longest line
      if (v.length > padding) {
        padding = v.length;
      }
      return v.trim().length !== 0;
    }).forEach(function(v) {
      var line = v.split(' ');
      var task = line.slice(1).join(' ');

      // Log dependencies as is
      if (rdependency.test(v)) {
        gutil.log(v);
        return;
      }

      // Pretty task with optionnal description
      gutil.log(
        line[0] + ' ' + chalk.cyan(task) +
        Array(padding + 3 - v.length).join(' ') +
        (getDescription(task) || '')
      );
    });
}

module.exports = logTasks;
