// TODO: make into `@gulpjs/messages`
var messages = require('../../../../../messages');

module.exports = {
  message: function(msg, data) {
    if (msg === messages.GULPFILE) {
      return 'Using gulpfile!';
    }

    if (msg === messages.TASK_ERROR) {
      return 'TASK ERROR: **' + data.task + '**';
    }
  }
};
