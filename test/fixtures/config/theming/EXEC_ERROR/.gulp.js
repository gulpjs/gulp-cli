// TODO: make into `@gulpjs/messages`
var messages = require('../../../../../messages');

module.exports = {
  message: function (msg) {
    if (msg === messages.EXEC_ERROR) {
      return 'FAIL TO RUN';
    }

    if (msg === messages.GULPFILE) {
      throw new Error('Crash before task execution');
    }
  }
};
