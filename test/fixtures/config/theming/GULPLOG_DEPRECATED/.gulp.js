var messages = require('@gulpjs/messages');

module.exports = {
  message: function (data) {
    if (data.tag === messages.GULPLOG_DEPRECATED) {
      return 'GULPLOG V1 IS DEPRECATED';
    }

    return false;
  },
  timestamp: function () {
    return false;
  }
};
