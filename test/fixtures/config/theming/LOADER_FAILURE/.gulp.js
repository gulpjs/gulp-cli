// TODO: make into `@gulpjs/messages`
var messages = require('../../../../../messages');

module.exports = {
  message: function (data) {
    if (data.tag === messages.LOADER_FAILURE) {
      return 'FAIL TO LOAD **' + data.name + '**';
    }

    if (data.tag === messages.LOADER_ERROR) {
      // Silence for test
      return false;
    }
  }
};
