// TODO: make into `@gulpjs/messages`
var messages = require('../../../../../messages');

module.exports = {
  message: function (data) {
    if (data.tag === messages.PRELOAD_BEFORE) {
      return 'PRELOADING **' + data.name + '**!';
    }

    // Silence all other messages for test
    return false;
  }
};
