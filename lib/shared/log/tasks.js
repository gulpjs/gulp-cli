'use strict';

var log = require('gulplog');
var chalk = require('chalk');
var isObject = require('../is-object');

function logTasks(tree, opts, getTask) {
  if (opts.sortTasks) {
    tree.nodes = tree.nodes.sort(compareByLabel);
  }

  var maxDepth = opts.tasksDepth;
  if (typeof maxDepth !== 'number') {
    maxDepth = 50;
  } else if (maxDepth < 1) {
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
  lines.push({ label: tree.label });
  var maxLabelWidth = 0;

  tree.nodes.forEach(function(node, idx, arr) {
    var isLast = idx === arr.length - 1;
    var w = createTreeLines(node, lines, opts, 1, '', isLast);
    maxLabelWidth = Math.max(maxLabelWidth, w || 0);
  });

  lines.forEach(function(line) {
    var s = line.label;
    if (line.desc) {
      var spaces = ' '.repeat(maxLabelWidth - line.label.length) + '  ';
      s += spaces + line.desc;
    }
    log.info(s);
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
    line.label = chalk.white(taskBars) + chalk.white(task.label);
  } else {
    line.label = chalk.white(taskBars) + chalk.cyan(task.label);
  }
  if (typeof task.desc === 'string' && task.desc) {
    line.desc = chalk.white(task.desc);
  }
  lines.push(line);

  var maxLabelWidth = line.label.length

  if (!isObject(task.flags)) {
    return maxLabelWidth;
  }

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
    lines.push(line);
    line.label = chalk.white(flagBars) + chalk.magenta(ent[0]);

    maxLabelWidth = Math.max(maxLabelWidth, line.label.length);

    if (typeof ent[1] !== 'string' || !ent[1]) return;
    line.desc = chalk.white('…' + ent[1]);
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

