// TODO: make into `@gulpjs/messages`
var messages = require('../../../../../messages');

module.exports = {
  message: function (data) {
    if (data.tag === messages.TASK_ERROR) {
      return '**TASK ERROR**';
    }

    // Silence everything else for test
    return false;
  },
  timestamp: function () {
    // Silence timestamps for test
    return false;
  }
};
