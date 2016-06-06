'use strict';

module.exports = [
  {
    name: 'version',
    description: 'Print the global and local gulp versions'
  },
  {
    name: 'require',
    description: 'Require a module before running the gulpfile'
  },
  {
    name: 'gulpfile',
    description: 'The path of the gulpfile'
  },
  {
    name: 'cwd',
    short: 'w',
    description: 'The current working directory'
  },
  {
    name: 'verify',
    short: '-V',
    description: 'Verify plugins in package.json against their blacklists'
  },
  {
    name: 'tasks',
    short: 'T',
    description: 'Display the task dependency tree'
  },
  {
    name: 'depth',
    description: 'Specify the depth of the task dependency tree',
    default: 0
  },
  {
    name: 'tasks-simple',
    short: 'S',
    description: 'Display a plaintext list of all tasks'
  },
  {
    name: 'tasks-json',
    short: 'J',
    description: 'Display a JSON list of all tasks'
  },
  {
    name: 'color',
    description: 'Display colors even if no color support is detected'
  },
  {
    name: 'no-color',
    description: 'Force gulp and plugins to not display colors'
  },
  {
    name: 'silent',
    description: 'Disable all gulp logging'
  },
  {
    name: 'continue',
    short: 'u',
    description: 'Continue execution of tasks upon failure'
  },
  {
    name: 'log-level',
    short: 'L',
    description: 'Set the loglevel (-L for least verbose and' +
    '-LLLL for most verbose. -LLL is default)'
  }
];
