// TODO: make into `@gulpjs/messages`
var messages = require('../../../../../messages');

module.exports = {
  message: function (msg) {
    if (msg === messages.MISSING_GULPFILE) {
      return 'NO GULPFILE';
    }
  }
};
