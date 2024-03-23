var messages = require('@gulpjs/messages');

module.exports = {
  message: function (data) {
    if (data.tag === messages.CWD_CHANGED) {
      return 'CHANGE CWD TO **' + data.cwd + '**';
    }

    // Silence all other messages for test
    return false;
  }
};
