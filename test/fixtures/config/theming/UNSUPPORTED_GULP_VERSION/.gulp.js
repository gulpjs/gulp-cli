// TODO: make into `@gulpjs/messages`
var messages = require('../../../../../messages');

module.exports = {
  message: function (msg, data) {
    if (msg === messages.UNSUPPORTED_GULP_VERSION) {
      return 'BAD GULP VERSION **' + data + '**';
    }
  }
};
