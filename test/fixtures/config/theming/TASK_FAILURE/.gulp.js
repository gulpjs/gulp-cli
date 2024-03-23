var messages = require('@gulpjs/messages');

module.exports = {
  message: function (data) {
    if (data.tag === messages.TASK_FAILURE) {
      return 'TASK FAILURE: **' + data.task + '**';
    }

    // Silence everything else for test
    return false;
  },
  timestamp: function () {
    // Silence timestamps for test
    return false;
  }
};
