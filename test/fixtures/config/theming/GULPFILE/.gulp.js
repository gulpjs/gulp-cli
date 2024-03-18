// TODO: make into `@gulpjs/messages`
var messages = require('../../../../../messages');

module.exports = {
  message: function (msg, data) {
    if (msg === messages.GULPFILE) {
      return 'USING GULPFILE **abcxyz**';
    }

    // Silence all other messages for test
    return false;
  }
};

