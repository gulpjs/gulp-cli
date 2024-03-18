// TODO: make into `@gulpjs/messages`
var messages = require('../../../../../messages');

module.exports = {
  message: function (msg, data) {
    if (msg === messages.PRELOAD_BEFORE) {
      return 'PRELOADING **' + data + '**!';
    }

    // Silence all other messages for test
    return false;
  }
};
