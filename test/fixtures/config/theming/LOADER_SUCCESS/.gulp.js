var messages = require('@gulpjs/messages');

module.exports = {
  message: function (data) {
    if (data.tag === messages.LOADER_SUCCESS) {
      return 'LOADED **' + data.name + '**!';
    }

    // Silence all other messages for test
    return false;
  }
};
