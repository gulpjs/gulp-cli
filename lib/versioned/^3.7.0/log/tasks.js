'use strict';

var archy = require('archy');
var chalk = require('chalk');
var gutil = require('gulp-util');
var tildify = require('tildify');

var taskTree = require('../taskTree');

function logTasks(env, localGulp) {
  var tree = taskTree(localGulp.tasks);
  var padding = 0;
  tree.label = 'Tasks for ' + chalk.magenta(tildify(env.configPath));
  archy(tree)
    .split('\n')
    .filter(function (v, i) {
      // log first line as is
      if ( i === 0 ) {
        gutil.log(v);
          return false;
      }
      // search for longest line
      if ( v.length > padding ) {
        padding = v.length;
      }
      return v.trim().length !== 0;

    }).forEach(function (v) {
      var line = v.split(' ');
      var task = line.slice(1).join(' ');

      if ( /.└/.test(v) ) {
        // log dependencies as is
        gutil.log(v);
      } else {
        // pretty task with optionnal description
        gutil.log(
          line[0] + ' ' +
          chalk.cyan(task) +
          Array( padding + 3 - v.length ).join(' ') +
          ( localGulp.tasks[task].fn.description || '' )
        );
      }
    });
}

module.exports = logTasks;
