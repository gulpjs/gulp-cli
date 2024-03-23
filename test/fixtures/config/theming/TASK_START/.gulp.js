var messages = require('@gulpjs/messages');

module.exports = {
  message: function (data) {
    if (data.tag === messages.TASK_START) {
      return 'START **' + data.task + '**';
    }

    // Silence all other messages for test
    return false;
  }
};
