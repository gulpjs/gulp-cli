var messages = require('@gulpjs/messages');

module.exports = {
  message: function (data) {
    if (data.tag === messages.TASK_SYNC) {
      return 'TASK **' + data.tasks + '** DID NOT COMPLETE';
    }
  }
};
