// TODO: make into `@gulpjs/messages`
var messages = require('../../../../../messages');

module.exports = {
  message: function (msg) {
    if (msg === messages.RESPAWNED) {
      return 'RESPAWN!';
    }

    // Silence all other messages for test
    return false;
  }
};
