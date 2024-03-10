'use strict';

var options = {
  help: {
    alias: 'h',
    type: 'boolean',
  },
  version: {
    alias: 'v',
    type: 'boolean',
  },
  preload: {
    type: 'string',
    requiresArg: true,
  },
  gulpfile: {
    alias: 'f',
    type: 'string',
    requiresArg: true,
  },
  cwd: {
    type: 'string',
    requiresArg: true,
  },
  tasks: {
    alias: 'T',
    type: 'boolean',
  },
  'tasks-simple': {
    type: 'boolean',
  },
  'tasks-json': {
  },
  'tasks-depth': {
    alias: 'depth',
    type: 'number',
    requiresArg: true,
    default: undefined,  // To detect if this cli option is specified.
  },
  'compact-tasks': {
    type: 'boolean',
    default: undefined,  // To detect if this cli option is specified.
  },
  'sort-tasks': {
    type: 'boolean',
    default: undefined,  // To detect if this cli option is specified.
  },
  color: {
    type: 'boolean',
  },
  'no-color': {
    type: 'boolean',
  },
  silent: {
    alias: 'S',
    type: 'boolean',
    default: undefined,  // To detect if this cli option is specified.
  },
  continue: {
    type: 'boolean',
    default: undefined,  // To detect if this cli option is specified.
  },
  series: {
    type: 'boolean',
    default: undefined,  // To detect if this cli option is specified.
  },
  'log-level': {
    alias: 'L',
    // Type isn't needed because count acts as a boolean
    count: true,
    default: undefined,  // To detect if this cli option is specified.
  }
};

module.exports = options;
