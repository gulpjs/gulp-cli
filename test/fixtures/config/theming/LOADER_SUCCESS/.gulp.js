// TODO: make into `@gulpjs/messages`
var messages = require('../../../../../messages');

module.exports = {
  message: function (msg, data) {
    if (msg === messages.LOADER_SUCCESS) {
      return 'LOADED **' + data + '**!';
    }

    // Silence all other messages for test
    return false;
  }
};
