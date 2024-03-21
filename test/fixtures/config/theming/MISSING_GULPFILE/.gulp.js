// TODO: make into `@gulpjs/messages`
var messages = require('../../../../../messages');

module.exports = {
  message: function (data) {
    if (data.tag === messages.MISSING_GULPFILE) {
      return 'NO GULPFILE';
    }
  }
};
