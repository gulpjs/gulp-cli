var messages = require('@gulpjs/messages');

module.exports = {
  message: function (data) {
    if (data.tag === messages.FLAG_HELP) {
      return '**HELP**';
    }

    if (data.tag === messages.FLAG_VERSION) {
      return '**VERSION**';
    }

    if (data.tag === messages.FLAG_PRELOAD) {
      return '**PRELOAD**';
    }

    if (data.tag === messages.FLAG_GULPFILE) {
      return '**GULPFILE**';
    }

    if (data.tag === messages.FLAG_CWD) {
      return '**CWD**';
    }

    if (data.tag === messages.FLAG_TASKS) {
      return '**TASKS**';
    }

    if (data.tag === messages.FLAG_TASKS_SIMPLE) {
      return '**TASKS SIMPLE**';
    }

    if (data.tag === messages.FLAG_TASKS_JSON) {
      return '**TASKS JSON**';
    }

    if (data.tag === messages.FLAG_TASKS_DEPTH) {
      return '**TASKS DEPTH**';
    }

    if (data.tag === messages.FLAG_COMPACT_TASKS) {
      return '**COMPACT TASKS**';
    }

    if (data.tag === messages.FLAG_SORT_TASKS) {
      return '**SORT_TASKS**';
    }

    if (data.tag === messages.FLAG_COLOR) {
      return '**COLOR**';
    }

    if (data.tag === messages.FLAG_NO_COLOR) {
      return '**NO COLOR**';
    }

    if (data.tag === messages.FLAG_SILENT) {
      return '**SILENT**';
    }

    if (data.tag === messages.FLAG_CONTINUE) {
      return '**CONTINUE**';
    }

    if (data.tag === messages.FLAG_SERIES) {
      return '**SERIES**';
    }

    if (data.tag === messages.FLAG_LOG_LEVEL) {
      return '**LOG LEVEL**';
    }

    // Silence all other messages for test
    return false;
  }
};
