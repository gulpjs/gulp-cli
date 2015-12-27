'use strict';

var archy = require('archy');
var chalk = require('chalk');
var log = require('gulplog');
var _ = require('lodash');

function forEachTreeNode(node, fn) {
  if (node == null || node.nodes == null) {
    return;
  }

  var args = [].slice.call(arguments, 2);

  node.nodes.forEach(function(child) {
    fn.apply(node, [child].concat(args));
    forEachTreeNode(child, fn);
  });
}

function logTasks(tree) {
  tree.nodes = _.sortBy(tree.nodes, function(node) {
    return node.label;
  });

  var tasks = [];
  tree.nodes.forEach(function(node) {
    tasks.push({
      name: node.label,
      desc: (typeof node.description === 'string') ? node.description : null,
      type: 'top',
    });
    if (node.flag != null && typeof node.flag === 'object') {
      Object.keys(node.flag).sort().forEach(function(opt) {
        if (opt.length === 0) {
          return;
        }
        node.label += '\n' + opt;
        tasks.push({
          name: opt,
          desc: node.flag[opt],
          type: 'option',
        });
      });
    }
    forEachTreeNode(node, function(child) {
      tasks.push({
        name: child.label,
        type: 'child',
      });
    });
  });

  var maxSize = 0;
  var sizes = [];
  archy(tree)
    .split('\n')
    .slice(1, -1)
    .filter(function(line, index) {
      var t = tasks[index];
      if (t.type === 'top' || t.type === 'option') {
        maxSize = Math.max(maxSize, line.length);
        sizes.push(line.length);
      } else {
        sizes.push(0);
      }
      return line;
    });
  maxSize += 2;

  tree.nodes.forEach(function(node) {
    node.label = '';
    if (node.flag != null && typeof node.flag === 'object') {
      Object.keys(node.flag).sort().forEach(function(opt) {
        if (opt.length === 0) {
          return;
        }
        node.label += '\n';
      });
    }
    forEachTreeNode(node, function(child) {
      child.label = '';
    });
  });

  var lines = archy(tree)
    .split('\n')
    .slice(1, -1)
    .filter(function(line) {
      return line;
    });

  log.info(tree.label);
  lines.forEach(function(line, index) {
    var t = tasks[index];
    var s = chalk.gray(line);
    if (t.type === 'top') {
      s += chalk.cyan(t.name);
      if (t.desc) {
        s += Array(maxSize - sizes[index]).join(' ');
        s += t.desc;
      }
    } else if (t.type === 'child') {
      s += chalk.gray(t.name);
    } else if (t.type === 'option') {
      s += chalk.magenta(t.name);
      if (t.desc) {
        s += Array(maxSize - sizes[index]).join(' ');
        s += '…' + t.desc;
      }
    }
    log.info(s);
  });
}

module.exports = logTasks;
