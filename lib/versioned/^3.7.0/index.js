'use strict';

var log = require('gulplog');
var stdout = require('mute-stdout');

var taskTree = require('./taskTree');

var color = require('../../shared/colorize');
var tildify = require('../../shared/tildify');
var logTasks = require('../../shared/log/tasks');
var logEvents = require('./log/events');
var logTasksSimple = require('./log/tasksSimple');
var registerExports = require('../../shared/registerExports');

function execute(opts, env, config) {
  var tasks = opts._;
  var toRun = tasks.length ? tasks : ['default'];

  if (opts.tasksSimple || opts.tasks) {
    // Mute stdout if we are listing tasks
    stdout.mute();
  }

  // This is what actually loads up the gulpfile
  var exported = require(env.configPath);
  log.info('Using gulpfile', color.highlight(tildify(env.configPath)));

  var gulpInst = require(env.modulePath);
  logEvents(gulpInst);

  registerExports(gulpInst, exported);

  // Always unmute stdout after gulpfile is required
  stdout.unmute();

  process.nextTick(function() {
    var tree;

    if (opts.tasksSimple) {
      return logTasksSimple(env, gulpInst);
    }
    if (opts.tasks) {
      tree = taskTree(gulpInst.tasks);
      if (config.description && typeof config.description === 'string') {
        tree.label = config.description;
      } else {
        tree.label = 'Tasks for ' + color.highlight(tildify(env.configPath));
      }
      return logTasks(tree, opts, function(task) {
        return gulpInst.tasks[task].fn;
      });
    }
    gulpInst.start.apply(gulpInst, toRun);
  });
}

module.exports = execute;
