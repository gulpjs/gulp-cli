// TODO: make into `@gulpjs/messages`
var messages = require('../../../../../messages');

module.exports = {
  message: function (data) {
    if (data.tag === messages.PRELOAD_FAILURE) {
      return 'FAILED TO PRELOAD **' + data.name + '**';
    }

    // Silence everything else for test
    return false;
  }
};