'use strict';

var archy = require('archy');
var chalk = require('chalk');
var tildify = require('tildify');
var log = require('gulplog');

function logTasks(gulpInst, gulpOpt, gulpEnv) {
  var opts = { deep: true, depth: gulpOpt.depth };

  var tasks = [];

  var tree = gulpInst.tree(opts, function(node, mtree, depth) {
    if (depth === 1) {
      if (node.description != null && typeof node.description === 'object') {
        tasks.push({
          name: node.label,
          desc: node.description[''],
          type: 'top',
        });
        Object.keys(node.description).sort().forEach(function(opt) {
          if (opt.length === 0) {
            return;
          }
          node.label += '\n' + opt;
          tasks.push({
            name: opt,
            desc: node.description[opt],
            type: 'option',
          });
        });
      } else if (typeof node.description === 'string') {
        tasks.push({
          name: node.label,
          desc: node.description,
          type: 'top',
        });
      } else {
        tasks.push({
          name: node.label,
          desc: null,
          type: 'option',
        });
      }
    } else {
      tasks.push({
        name: node.label,
        type: 'child',
      });
    }

    return node;
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

  tree = gulpInst.tree(opts, function(node, mtree, depth) {
    node.label = '';
    if (depth === 1) {
      if (node.description != null && typeof node.description === 'object') {
        Object.keys(node.description).sort().forEach(function(opt) {
          if (opt.length === 0) {
            return;
          }
          node.label += '\n';
        });
      }
    }
    return node;
  });

  var lines = archy(tree)
    .split('\n')
    .slice(1, -1)
    .filter(function(line) {
      return line;
    });

  log.info('Tasks for ' + chalk.magenta(tildify(gulpEnv.configPath)));
  lines.forEach(function(line, index) {
    var t = tasks[index];
    var s = chalk.gray(line);
    if (t.type === 'top') {
      s += chalk.cyan(t.name);
      s += Array(maxSize - sizes[index]).join(' ');
      s += t.desc;
    } else if (t.type === 'child') {
      s += chalk.gray(t.name);
    } else if (t.type === 'option') {
      s += chalk.magenta(t.name);
      s += Array(maxSize - sizes[index]).join(' ');
      if (t.desc) {
        s += '…' + t.desc;
      }
    }
    log.info(s);
  });
}

module.exports = logTasks;
