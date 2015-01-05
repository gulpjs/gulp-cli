'use strict';

var archy = require('archy');
var chalk = require('chalk');
var gutil = require('gulp-util');
var tildify = require('tildify');

var taskTree = require('../taskTree');

function logTasks(env, localGulp) {
  var tree = taskTree(localGulp.tasks);
  tree.label = 'Tasks for ' + chalk.magenta(tildify(env.configPath));
  archy(tree)
    .split('\n')
    .forEach(function (v) {
      if (v.trim().length === 0) {
        return;
      }
      gutil.log(v);
    });
}

module.exports = logTasks;
