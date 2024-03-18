// TODO: make into `@gulpjs/messages`
var messages = require('../../../../../messages');

module.exports = {
  message: function(msg, data) {
    if (msg === messages.TASK_SYNC) {
      return 'TASK **' + data + '** DID NOT COMPLETE';
    }
  }
};
