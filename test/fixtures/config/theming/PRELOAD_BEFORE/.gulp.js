var messages = require('@gulpjs/messages');

module.exports = {
  message: function (data) {
    if (data.tag === messages.PRELOAD_BEFORE) {
      return 'PRELOADING **' + data.name + '**!';
    }

    // Silence all other messages for test
    return false;
  }
};
