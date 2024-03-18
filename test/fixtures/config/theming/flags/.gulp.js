// TODO: make into `@gulpjs/messages`
var messages = require('../../../../../messages');

module.exports = {
  message: function (msg, data) {
    if (msg === messages.FLAG_HELP) {
      return '**HELP**';
    }

    if (msg === messages.FLAG_VERSION) {
      return '**VERSION**';
    }

    if (msg === messages.FLAG_PRELOAD) {
      return '**PRELOAD**';
    }

    if (msg === messages.FLAG_GULPFILE) {
      return '**GULPFILE**';
    }

    if (msg === messages.FLAG_CWD) {
      return '**CWD**';
    }

    if (msg === messages.FLAG_TASKS) {
      return '**TASKS**';
    }

    if (msg === messages.FLAG_TASKS_SIMPLE) {
      return '**TASKS SIMPLE**';
    }

    if (msg === messages.FLAG_TASKS_JSON) {
      return '**TASKS JSON**';
    }

    if (msg === messages.FLAG_TASKS_DEPTH) {
      return '**TASKS DEPTH**';
    }

    if (msg === messages.FLAG_COMPACT_TASKS) {
      return '**COMPACT TASKS**';
    }

    if (msg === messages.FLAG_SORT_TASKS) {
      return '**SORT_TASKS**';
    }

    if (msg === messages.FLAG_COLOR) {
      return '**COLOR**';
    }

    if (msg === messages.FLAG_NO_COLOR) {
      return '**NO COLOR**';
    }

    if (msg === messages.FLAG_SILENT) {
      return '**SILENT**';
    }

    if (msg === messages.FLAG_CONTINUE) {
      return '**CONTINUE**';
    }

    if (msg === messages.FLAG_SERIES) {
      return '**SERIES**';
    }

    if (msg === messages.FLAG_LOG_LEVEL) {
      return '**LOG LEVEL**';
    }

    // Silence all other messages for test
    return false;
  }
};
