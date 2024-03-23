var messages = require('@gulpjs/messages');

module.exports = {
  message: function (data) {
    if (data.tag === messages.UNSUPPORTED_GULP_VERSION) {
      return 'BAD GULP VERSION **' + data.version + '**';
    }
  }
};
