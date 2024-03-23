var messages = require('@gulpjs/messages');

module.exports = {
  message: function (data) {
    if (data.tag === messages.RESPAWNED) {
      return 'RESPAWN!';
    }

    // Silence all other messages for test
    return false;
  }
};
