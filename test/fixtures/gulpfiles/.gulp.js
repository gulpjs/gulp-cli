var messages = require('@gulpjs/messages');

module.exports = {
  message: function (data) {
    if (data.tag === messages.DESCRIPTION) {
      return "gulp-cli/test/fixtures/gulpfiles";
    }
  }
};
