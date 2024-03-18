// TODO: make into `@gulpjs/messages`
var messages = require('../../../../../messages');

module.exports = {
  message: function (msg, data) {
    if (msg === messages.ARGV_ERROR) {
      return '**' + data.message + '**';
    }
  }
};
