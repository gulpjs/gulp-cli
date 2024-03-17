// TODO: make into `@gulpjs/messages`
var messages = require('../../messages');

module.exports = {
  message: function (msg) {
    if (msg === messages.DESCRIPTION) {
      return "gulp-cli/test/fixtures";
    }
  }
};
