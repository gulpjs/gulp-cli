'use strict';

var _ = require('lodash');
var isString = _.isString;
var isObject = _.isPlainObject;
var isFunction = _.isFunction;

function getTask(gulpInst) {
  return function(name) {
    var task = gulpInst.task(name);
    var func = isFunction(task.unwrap) ? task.unwrap() : {};
    return {
      description: getDescription(task, func),
      flags: getFlags(task, func),
    };
  };
}

function getDescription(task, func) {
  if (isString(task.description)) {
    return task.description;
  }
  if (isString(func.description)) {
    return func.description;
  }
  return undefined;
}

function getFlags(task, func) {
  if (isObject(task.flags)) {
    return task.flags;
  }
  if (isObject(func.flags)) {
    return func.flags;
  }
  return undefined;
}

module.exports = getTask;
