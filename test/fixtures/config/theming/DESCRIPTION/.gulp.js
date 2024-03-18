// TODO: make into `@gulpjs/messages`
var messages = require('../../../../../messages');

module.exports = {
  message: function (msg, data) {
    if (msg === messages.DESCRIPTION) {
      return '**DESCRIPTION**';
    }
  }
};
