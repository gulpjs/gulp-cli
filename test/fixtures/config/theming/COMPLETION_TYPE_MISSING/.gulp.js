// TODO: make into `@gulpjs/messages`
var messages = require('../../../../../messages');

module.exports = {
  message: function(msg) {
    if (msg === messages.COMPLETION_TYPE_MISSING) {
      return 'NO COMPLETION TYPE';
    }
  }
};
