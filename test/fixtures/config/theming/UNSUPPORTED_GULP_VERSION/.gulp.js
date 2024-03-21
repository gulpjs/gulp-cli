// TODO: make into `@gulpjs/messages`
var messages = require('../../../../../messages');

module.exports = {
  message: function (data) {
    if (data.tag === messages.UNSUPPORTED_GULP_VERSION) {
      return 'BAD GULP VERSION **' + data.version + '**';
    }
  }
};
