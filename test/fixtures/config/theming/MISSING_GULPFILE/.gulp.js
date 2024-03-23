var messages = require('@gulpjs/messages');

module.exports = {
  message: function (data) {
    if (data.tag === messages.MISSING_GULPFILE) {
      return 'NO GULPFILE';
    }
  }
};
