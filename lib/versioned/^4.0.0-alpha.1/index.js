'use strict';

var fs = require('fs');
var log = require('gulplog');
var stdout = require('mute-stdout');

var msgs = require('../../shared/log/messages');
var theme = require('../../shared/log/theme');
// var format = require('theming-log').format;

var exit = require('../../shared/exit');
var tildify = require('../../shared/tildify');

var logTasks = require('../../shared/log/tasks');
var logEvents = require('../^4.0.0/log/events');
var logSyncTask = require('../^4.0.0/log/sync-task');
var logTasksSimple = require('../^4.0.0/log/tasks-simple');
var checkTaskNotFound = require('../^4.0.0/log/check-task-not-found');
var registerExports = require('../../shared/register-exports');

var copyTree = require('../../shared/log/copy-tree');
var requireOrImport = require('../../shared/require-or-import');

function execute(env) {
  var opts = env.config.flags;

  var tasks = opts._;
  var toRun = tasks.length ? tasks : ['default'];

  if (opts.tasksSimple || opts.tasks || opts.tasksJson) {
    // Mute stdout if we are listing tasks
    stdout.mute();
  }

  var gulpInst = require(env.modulePath);
  logEvents(gulpInst);
  logSyncTask(gulpInst, opts);

  // This is what actually loads up the gulpfile
  requireOrImport(env.configPath, function(err, exported) {
    // Before import(), if require() failed we got an unhandled exception on the module level.
    // So console.error() & exit() were added here to mimic the old behavior as close as possible.
    if (err) {
      console.error(err);
      exit(1);
    }

    registerExports(gulpInst, exported);

    // Always unmute stdout after gulpfile is required
    stdout.unmute();

    var tree;
    if (opts.tasksSimple) {
      return logTasksSimple(gulpInst.tree());
    }
    if (opts.tasks) {
      tree = {};
      tree.label = tildify(env.configPath);
      tree.nodes = gulpInst.tree({ deep: true });

      return logTasks(tree, opts, function(taskname) {
        return gulpInst.task(taskname);
      });
    }
    if (opts.tasksJson) {
      tree = {};
      // tree.label = format(theme, msgs.tasksJson.description, tildify(env.configPath));
      tree.nodes = gulpInst.tree({ deep: true });

      var output = JSON.stringify(copyTree(tree, opts));
      if (typeof opts.tasksJson === 'boolean' && opts.tasksJson) {
        return console.log(output);
      }
      return fs.writeFileSync(opts.tasksJson, output, 'utf-8');
    }
    try {
      log.info(msgs.info.usingGulpfile, tildify(env.configPath));
      var runMethod = opts.series ? 'series' : 'parallel';
      gulpInst[runMethod](toRun)(function(err) {
        if (err) {
          exit(1);
        }
      });
    } catch (err) {
      var task = checkTaskNotFound(err);
      if (task) {
        log.error(msgs.error.taskNotFound, task.target, Boolean(task.similar), task.similar);
      } else {
        log.error(msgs.error.failToRun, err.message);
      }
      exit(1);
    }
  });
}

module.exports = execute;
