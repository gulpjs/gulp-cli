// TODO: make into `@gulpjs/messages`
var messages = require('../../../../../messages');

module.exports = {
  message: function (data) {
    if (data.tag === messages.RESPAWNED) {
      return 'RESPAWN!';
    }

    // Silence all other messages for test
    return false;
  }
};
