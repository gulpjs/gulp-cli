// TODO: make into `@gulpjs/messages`
var messages = require('../../../../../messages');

module.exports = {
  message: function (data) {
    if (data.tag === messages.GULPFILE) {
      return 'Using gulpfile!';
    }

    if (data.tag === messages.TASK_MISSING) {
      return 'TASK IS NOT FOUND: **' + data.task + '** SIMILAR ##' + data.similar.join('') + '##';
    }
  }
};
