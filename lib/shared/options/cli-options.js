'use strict';

var chalk = require('chalk');

var options = {
  help: {
    alias: 'h',
    type: 'boolean',
    desc: chalk.gray(
      'Show this help.'),
  },
  version: {
    alias: 'v',
    type: 'boolean',
    desc: chalk.gray(
      'Print the global and local gulp versions.'),
  },
  preload: {
    type: 'string',
    requiresArg: true,
    desc: chalk.gray(
      'Will preload a module before running the gulpfile. ' +
      'This is useful for transpilers but also has other applications.'),
  },
  gulpfile: {
    alias: 'f',
    type: 'string',
    requiresArg: true,
    desc: chalk.gray(
      'Manually set path of gulpfile. Useful if you have multiple gulpfiles. ' +
      'This will set the CWD to the gulpfile directory as well.'),
  },
  cwd: {
    type: 'string',
    requiresArg: true,
    desc: chalk.gray(
      'Manually set the CWD. The search for the gulpfile, ' +
      'as well as the relativity of all requires will be from here.'),
  },
  tasks: {
    alias: 'T',
    type: 'boolean',
    desc: chalk.gray(
      'Print the task dependency tree for the loaded gulpfile.'),
  },
  'tasks-simple': {
    type: 'boolean',
    desc: chalk.gray(
      'Print a plaintext list of tasks for the loaded gulpfile.'),
  },
  'tasks-json': {
    desc: chalk.gray(
      'Print the task dependency tree, ' +
      'in JSON format, for the loaded gulpfile.'),
  },
  'tasks-depth': {
    alias: 'depth',
    type: 'number',
    requiresArg: true,
    default: undefined,  // To detect if this cli option is specified.
    desc: chalk.gray(
      'Specify the depth of the task dependency tree.'),
  },
  'compact-tasks': {
    type: 'boolean',
    default: undefined,  // To detect if this cli option is specified.
    desc: chalk.gray(
      'Reduce the output of task dependency tree by printing ' +
      'only top tasks and their child tasks.'),
  },
  'sort-tasks': {
    type: 'boolean',
    default: undefined,  // To detect if this cli option is specified.
    desc: chalk.gray(
      'Will sort top tasks of task dependency tree.'),
  },
  color: {
    type: 'boolean',
    desc: chalk.gray(
      'Will force gulp and gulp plugins to display colors, ' +
      'even when no color support is detected.'),
  },
  'no-color': {
    type: 'boolean',
    desc: chalk.gray(
      'Will force gulp and gulp plugins to not display colors, ' +
      'even when color support is detected.'),
  },
  silent: {
    alias: 'S',
    type: 'boolean',
    default: undefined,  // To detect if this cli option is specified.
    desc: chalk.gray(
      'Suppress all gulp logging.'),
  },
  continue: {
    type: 'boolean',
    default: undefined,  // To detect if this cli option is specified.
    desc: chalk.gray(
      'Continue execution of tasks upon failure.'),
  },
  series: {
    type: 'boolean',
    default: undefined,  // To detect if this cli option is specified.
    desc: chalk.gray(
      'Run tasks given on the CLI in series (the default is parallel).'),
  },
  'log-level': {
    alias: 'L',
    // Type isn't needed because count acts as a boolean
    count: true,
    default: undefined,  // To detect if this cli option is specified.
    desc: chalk.gray(
      'Set the loglevel. -L for least verbose and -LLLL for most verbose. ' +
      '-LLL is default.'),
  }
};

module.exports = options;
