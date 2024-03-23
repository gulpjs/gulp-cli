var messages = require('@gulpjs/messages');

module.exports = {
  message: function (data) {
    if (data.tag === messages.EXEC_ERROR) {
      return 'FAIL TO RUN';
    }

    if (data.tag === messages.GULPFILE) {
      throw new Error('Crash before task execution');
    }
  }
};
