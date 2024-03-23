var messages = require('@gulpjs/messages');

module.exports = {
  message: function (data) {
    if (data.tag === messages.COMPLETION_TYPE_UNKNOWN) {
      return 'GULP COMPLETION TYPE **' + data.name + '** IS NOT FOUND';
    }
  }
};
