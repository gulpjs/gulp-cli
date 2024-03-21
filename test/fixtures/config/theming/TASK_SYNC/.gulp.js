// TODO: make into `@gulpjs/messages`
var messages = require('../../../../../messages');

module.exports = {
  message: function (data) {
    if (data.tag === messages.TASK_SYNC) {
      return 'TASK **' + data.tasks + '** DID NOT COMPLETE';
    }
  }
};
