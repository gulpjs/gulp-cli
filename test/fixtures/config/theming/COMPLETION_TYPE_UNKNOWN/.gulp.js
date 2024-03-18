// TODO: make into `@gulpjs/messages`
var messages = require('../../../../../messages');

module.exports = {
  message: function(msg, data) {
    if (msg === messages.COMPLETION_TYPE_UNKNOWN) {
      return 'GULP COMPLETION TYPE **' + data.name + '** IS NOT FOUND';
    }
  }
};
