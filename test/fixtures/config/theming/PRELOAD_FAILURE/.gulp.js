// TODO: make into `@gulpjs/messages`
var messages = require('../../../../../messages');

module.exports = {
  message: function(msg, data) {
    if (msg === messages.PRELOAD_FAILURE) {
      return 'FAILED TO PRELOAD **' + data + '**';
    }

    // Silence everything else for test
    return false;
  }
};
