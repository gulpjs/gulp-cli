'use strict';

module.exports = function(tasks) {
  function tree(prev, task) {
    var node = {
      label: task,
      nodes: [],
    };
    if (tasks[task] && tasks[task].dep.length > 0) {
      node = tasks[task].dep.reduce(tree, node);
    }
    prev.nodes.push(node);
    return prev;
  }
  
  return Object.keys(tasks)
    .reduce(tree, {
      nodes: [],
    });
};
