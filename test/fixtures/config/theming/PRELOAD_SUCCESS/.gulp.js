// TODO: make into `@gulpjs/messages`
var messages = require('../../../../../messages');

module.exports = {
  message: function (data) {
    if (data.tag === messages.PRELOAD_SUCCESS) {
      return 'PRELOADED **' + data.name + '**!';
    }

    // Silence all other messages for test
    return false;
  }
};
