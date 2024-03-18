// TODO: make into `@gulpjs/messages`
var messages = require('../../../../../messages');

module.exports = {
  message: function(msg, data) {
    if (msg === messages.LOADER_FAILURE) {
      return 'FAIL TO LOAD **' + data + '**';
    }

    if (msg === messages.LOADER_ERROR) {
      // Silence for test
      return false;
    }
  }
};
