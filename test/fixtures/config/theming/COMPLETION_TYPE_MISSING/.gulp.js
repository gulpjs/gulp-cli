// TODO: make into `@gulpjs/messages`
var messages = require('../../../../../messages');

module.exports = {
  message: function (data) {
    if (data.tag === messages.COMPLETION_TYPE_MISSING) {
      return 'NO COMPLETION TYPE';
    }
  }
};
