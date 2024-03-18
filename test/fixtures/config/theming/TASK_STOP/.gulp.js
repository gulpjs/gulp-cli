// TODO: make into `@gulpjs/messages`
var messages = require('../../../../../messages');

module.exports = {
  message: function (msg, data) {
    if (msg === messages.TASK_STOP) {
      return 'STOP **' + data.task + '**';
    }

    // Silence all other messages for test
    return false;
  }
};
