var messages = require('@gulpjs/messages');

module.exports = {
  message: function (data) {
    if (data.tag === messages.COMPLETION_TYPE_MISSING) {
      return 'NO COMPLETION TYPE';
    }
  }
};
