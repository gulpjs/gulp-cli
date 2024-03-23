var messages = require('@gulpjs/messages');

module.exports = {
  message: function (data) {
    if (data.tag === messages.GULPFILE) {
      return 'USING GULPFILE **abcxyz**';
    }

    // Silence all other messages for test
    return false;
  }
};

