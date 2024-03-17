'use strict';

var messages = require("../../../messages");

var options = {
  help: {
    alias: 'h',
    type: 'boolean',
    message: messages.FLAG_HELP,
  },
  version: {
    alias: 'v',
    type: 'boolean',
    message: messages.FLAG_VERSION,
  },
  preload: {
    type: 'string',
    requiresArg: true,
    message: messages.FLAG_PRELOAD,
  },
  gulpfile: {
    alias: 'f',
    type: 'string',
    requiresArg: true,
    message: messages.FLAG_GULPFILE,
  },
  cwd: {
    type: 'string',
    requiresArg: true,
    message: messages.FLAG_CWD,
  },
  tasks: {
    alias: 'T',
    type: 'boolean',
    message: messages.FLAG_TASKS,
  },
  'tasks-simple': {
    type: 'boolean',
    message: messages.FLAG_TASKS_SIMPLE,
  },
  'tasks-json': {
    message: messages.FLAG_TASKS_JSON,
  },
  'tasks-depth': {
    alias: 'depth',
    type: 'number',
    requiresArg: true,
    default: undefined,  // To detect if this cli option is specified.
    message: messages.FLAG_TASKS_DEPTH,
  },
  'compact-tasks': {
    type: 'boolean',
    default: undefined,  // To detect if this cli option is specified.
    message: messages.FLAG_COMPACT_TASKS,
  },
  'sort-tasks': {
    type: 'boolean',
    default: undefined,  // To detect if this cli option is specified.
    message: messages.FLAG_SORT_TASKS,
  },
  color: {
    type: 'boolean',
    message: messages.FLAG_COLOR,
  },
  'no-color': {
    type: 'boolean',
    message: messages.FLAG_NO_COLOR,
  },
  silent: {
    alias: 'S',
    type: 'boolean',
    default: undefined,  // To detect if this cli option is specified.
    message: messages.FLAG_SILENT,
  },
  continue: {
    type: 'boolean',
    default: undefined,  // To detect if this cli option is specified.
    message: messages.FLAG_CONTINUE,
  },
  series: {
    type: 'boolean',
    default: undefined,  // To detect if this cli option is specified.
    message: messages.FLAG_SERIES,
  },
  'log-level': {
    alias: 'L',
    // Type isn't needed because count acts as a boolean
    count: true,
    default: undefined,  // To detect if this cli option is specified.
    message: messages.FLAG_LOG_LEVEL,
  }
};

module.exports = options;
