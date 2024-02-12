'use strict';

var log = require('gulplog');
var stringWidth = require('string-width');
var format = require('theming-log').format;
var theme = require('./theme');
var msgs = require('./messages');
var isObject = require('../is-object');

function logTasks(tree, opts, getTask) {
  if (opts.sortTasks) {
    tree.nodes = tree.nodes.sort(compareByLabel);
  }

  var maxDepth = opts.tasksDepth;
  if (typeof maxDepth !== 'number') {
    maxDepth = 50;
  } else /* istanbul ignore if */ if (maxDepth < 1) {
    maxDepth = 1;
  }

  var compactedTasks = opts.compactTasks ? tree.nodes : [];

  var treeOpts = {
    maxDepth: maxDepth,
    compactedTasks: compactedTasks,
    getTask: getTask,
  };

  printTaskTree(tree, treeOpts);
}

function printTaskTree(tree, opts) {
  var lines = [];
  var maxLabelWidth = 0;

  tree.nodes.forEach(function(node, idx, arr) {
    var isLast = idx === arr.length - 1;
    var w = createTreeLines(node, lines, opts, 1, '', isLast);
    maxLabelWidth = Math.max(maxLabelWidth, w || /* istanbul ignore next */ 0);
  });

  log.info(msgs.tasks.description, tree.label);

  lines.forEach(function(line) {
    if (line.desc) {
      var spaces = ' '.repeat(maxLabelWidth - line.width) + '  ';
      log.info(line.fmt, line.bars, line.name, true, spaces, line.desc);
    } else {
      log.info(line.fmt, line.bars, line.name);
    }
  });
}

function createTreeLines(node, lines, opts, depth, bars, isLast) {
  var task = { label: node.label, bars: bars, depth: depth };
  if (depth === 1) {
    var t = opts.getTask(node.label);
    task.desc = t.description;
    task.flags = t.flags;
  }

  var isLeaf = isLeafNode(node, depth, opts);

  var maxLabelWidth = addTaskToLines(task, lines, isLast, isLeaf);

  if (!isLeaf) {
    bars += (isLast ? '  ' : '│ ');
    node.nodes.forEach(function(node, idx, arr) {
      var isLast = idx === arr.length - 1;
      createTreeLines(node, lines, opts, depth + 1, bars, isLast);
    });
  }

  return maxLabelWidth;
}

function addTaskToLines(task, lines, isLast, isLeaf) {
  var taskBars = task.bars + (isLast ? '└' : '├') + '─';
  if (isLeaf) {
    taskBars += '─ ';
  } else {
    taskBars += '┬ ';
  }

  var line = {};
  if (task.depth === 1) {
    line.fmt = msgs.tasks.topTask;
    line.bars = taskBars;
    line.name = task.label;
  } else {
    line.fmt = msgs.tasks.childTask;
    line.bars = taskBars;
    line.name = task.label;
  }
  line.width = stringWidth(format(theme, line.fmt, line.bars, line.name));

  if (typeof task.desc === 'string' && task.desc) {
    line.desc = task.desc;
  }
  lines.push(line);

  if (!isObject(task.flags)) {
    return line.width;
  }

  var maxLabelWidth = line.width;

  var flagBars = task.bars;
  if (isLast) {
    flagBars += '  ';
  } else {
    flagBars += '│ ';
  }

  if (isLeaf) {
    flagBars += '  ';
  } else {
    flagBars += '│ ';
  }

  Object.entries(task.flags).sort(flagSorter).forEach(addFlagsToLines);

  function addFlagsToLines(ent) {
    if (typeof ent[0] !== 'string' || !ent[0]) return;
    var line = {};
    line.fmt = msgs.tasks.option;
    line.bars = flagBars;
    line.name = ent[0];
    line.width = stringWidth(format(theme, line.fmt, line.bars, line.name));

    maxLabelWidth = Math.max(maxLabelWidth, line.width);

    if (typeof ent[1] == 'string' && ent[1]) {
      line.desc = ent[1];
    }
    lines.push(line);
  }

  return maxLabelWidth;
}

function isLeafNode(node, depth, opts) {
  if (depth >= opts.maxDepth) {
    return true;
  } else if (depth > 1 && opts.compactedTasks.includes(node)) {
    return true;
  } else if (!Array.isArray(node.nodes) || node.nodes.length === 0) {
    return true;
  }
  return false;
}

function compareByLabel(a, b) {
  /* istanbul ignore if */
  if (!b.label) {
    return -1;
  } else /* istanbul ignore if */ if (!a.label) {
    return 1;
  } else {
    return (a.label <= b.label) ? -1 : 1;
  }
}

function flagSorter(a, b) {
  return (a[0] <= b[0]) ? -1 : 1;
}

module.exports = logTasks;

