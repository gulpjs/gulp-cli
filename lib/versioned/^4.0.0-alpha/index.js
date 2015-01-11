'use strict';

var chalk = require('chalk');
var gutil = require('gulp-util');
var tildify = require('tildify');

var exit = require('../../shared/exit');

var logTasks = require('./log/tasks');
var logEvents = require('./log/events');
var logTasksSimple = require('./log/tasksSimple');

function execute(opts, env){

  var tasks = opts._;
  var toRun = tasks.length ? tasks : ['default'];

  var gulpInst = require(env.modulePath);
  logEvents(gulpInst);

  // this is what actually loads up the gulpfile
  require(env.configPath);

  process.nextTick(function () {
    if (opts.tasksSimple) {
      return logTasksSimple(gulpInst.tree());
    }
    if (opts.tasks) {
      var tree = {
        label: 'Tasks for ' + chalk.magenta(tildify(env.configPath)),
        nodes: gulpInst.tree({ deep: true })
      };
      return logTasks(tree);
    }
    if (opts.tasksJson) {
      return console.log(
        JSON.stringify(gulpInst.tree({ deep: true }), null, 2)
      );
    }
    try {
      gutil.log('Using gulpfile', chalk.magenta(tildify(env.configPath)));
      // TODO: do we care about the error/result from calling this?
      gulpInst.parallel(toRun)();
    } catch (err) {
      gutil.log(chalk.red(err.message));
      gutil.log(
        'Please check the documentation for proper gulpfile formatting'
      );
      exit(1);
    }
  });
}

module.exports = execute;
