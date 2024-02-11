const { series } = require('gulp');

function taskA(done) {
  done();
}
taskA.description = 'This is task A';
taskA.flags = {
  '--abc': 'is a flag for task A',
};

const taskB = function(done) {
  done();
}
taskB.description = 'This is task B';
taskB.flags = {
  '--def': 'is a flag for task B',
};

const defaults = series(taskA, taskB);
defaults.description = 'This is default task';
defaults.flags = {
  '--ghi': 'is a flag for default task',
};

exports.default = defaults;
exports.taskA = taskA;
exports.taskB = taskB;
