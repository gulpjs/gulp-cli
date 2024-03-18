// TODO: make into `@gulpjs/messages`
var messages = require('../../../../../messages');

module.exports = {
  message: function (msg, data) {
    if (msg === messages.TASK_START) {
      return 'START **' + data.task + '**';
    }

    // Silence all other messages for test
    return false;
  }
};
