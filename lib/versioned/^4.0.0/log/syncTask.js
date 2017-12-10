'use strict';

var log = require('gulplog');

var color = require('../../../shared/colorize');

var tasks = {};

function warn() {
  var taskKeys = Object.keys(tasks);

  if (!taskKeys.length) {
    return;
  }

  var taskNames = taskKeys.map(function(key) {
    return tasks[key];
  }).join(', ');

  log.warn(
    color.warning('The following tasks did not complete:'),
    color.task(taskNames)
  );
  log.warn(
    color.warning('Did you forget to signal async completion?')
  );
}

function start(e) {
  tasks[e.uid] = e.name;
}

function clear(e) {
  delete tasks[e.uid];
}

function logSyncTask(gulpInst) {

  process.once('exit', warn);
  gulpInst.on('start', start);
  gulpInst.on('stop', clear);
  gulpInst.on('error', clear);
}

module.exports = logSyncTask;
