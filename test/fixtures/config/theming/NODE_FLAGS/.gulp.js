var messages = require('@gulpjs/messages');

module.exports = {
  message: function (data) {
    if (data.tag === messages.NODE_FLAGS) {
      return 'RESPAWNED BY **' + data.flags + '**!';
    }

    // Silence all other messages for test
    return false;
  }
};
