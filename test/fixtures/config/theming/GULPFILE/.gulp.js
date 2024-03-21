// TODO: make into `@gulpjs/messages`
var messages = require('../../../../../messages');

module.exports = {
  message: function (data) {
    if (data.tag === messages.GULPFILE) {
      return 'USING GULPFILE **abcxyz**';
    }

    // Silence all other messages for test
    return false;
  }
};

