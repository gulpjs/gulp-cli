'use strict';

var color = require('./colorize');

module.exports = {
  help: {
    alias: 'h',
    type: 'boolean',
    desc: color.desc(
      'Show this help.'),
  },
  version: {
    alias: 'v',
    type: 'boolean',
    desc: color.desc(
      'Print the global and local gulp versions.'),
  },
  require: {
    type: 'string',
    requiresArg: true,
    desc: color.desc(
      'Will require a module before running the gulpfile. ' +
      'This is useful for transpilers but also has other applications.'),
  },
  gulpfile: {
    alias: 'f',
    type: 'string',
    requiresArg: true,
    desc: color.desc(
      'Manually set path of gulpfile. Useful if you have multiple gulpfiles. ' +
      'This will set the CWD to the gulpfile directory as well.'),
  },
  cwd: {
    type: 'string',
    requiresArg: true,
    desc: color.desc(
      'Manually set the CWD. The search for the gulpfile, ' +
      'as well as the relativity of all requires will be from here.'),
  },
  verify: {
    desc: color.desc(
      'Will verify plugins referenced in project\'s package.json against ' +
      'the plugins blacklist.'),
  },
  tasks: {
    alias: 'T',
    type: 'boolean',
    desc: color.desc(
      'Print the task dependency tree for the loaded gulpfile.'),
  },
  'tasks-simple': {
    type: 'boolean',
    desc: color.desc(
      'Print a plaintext list of tasks for the loaded gulpfile.'),
  },
  'tasks-json': {
    desc: color.desc(
      'Print the task dependency tree, ' +
      'in JSON format, for the loaded gulpfile.'),
  },
  'tasks-depth': {
    alias: 'depth',
    type: 'number',
    requiresArg: true,
    desc: color.desc(
      'Specify the depth of the task dependency tree.'),
  },
  'compact-tasks': {
    type: 'boolean',
    desc: color.desc(
      'Reduce the output of task dependency tree by printing ' +
      'only top tasks and their child tasks.'),
  },
  'sort-tasks': {
    type: 'boolean',
    desc: color.desc(
      'Will sort top tasks of task dependency tree.'),
  },
  color: {
    type: 'boolean',
    default: true,
    desc: color.desc(
      'Will force gulp and gulp plugins to display colors, ' +
      'even when no color support is detected.'),
  },
  'no-color': {
    type: 'boolean',
    desc: color.desc(
      'Will force gulp and gulp plugins to not display colors, ' +
      'even when color support is detected.'),
  },
  silent: {
    alias: 'S',
    type: 'boolean',
    desc: color.desc(
      'Suppress all gulp logging.'),
  },
  continue: {
    type: 'boolean',
    desc: color.desc(
      'Continue execution of tasks upon failure.'),
  },
  'log-level': {
    alias: 'L',
    // Type isn't needed because count acts as a boolean
    count: true,
    // Can't use `default` because it seems to be off by one
    desc: color.desc(
      'Set the loglevel. -L for least verbose and -LLLL for most verbose. ' +
      '-LLL is default.'),
  },
};
