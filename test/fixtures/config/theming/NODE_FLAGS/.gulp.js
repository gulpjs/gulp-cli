// TODO: make into `@gulpjs/messages`
var messages = require('../../../../../messages');

module.exports = {
  message: function (msg, data) {
    if (msg === messages.NODE_FLAGS) {
      return 'RESPAWNED BY **' + data + '**!';
    }

    // Silence all other messages for test
    return false;
  }
};
