// TODO: Add the symbol to messages
var messages = require('@gulpjs/messages');

module.exports = {
  message: function (data) {
    if (data.tag === Symbol.for('GULP_CLI_GULPLOG_DEPRECATED')) {
      return 'GULPLOG V1 IS DEPRECATED';
    }

    return false;
  },
  timestamp: function () {
    return false;
  }
};
