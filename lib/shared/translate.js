'use strict';

var util = require('util');

var chalk = require('chalk');

// TODO: make into `@gulpjs/messages`
var messages = require('../../messages');

function Timestamp() {
  this.now = new Date();
}

Timestamp.prototype[util.inspect.custom] = function (depth, opts) {
  var timestamp = this.now.toLocaleTimeString('en', { hour12: false });
  return '[' + opts.stylize(timestamp, 'date') + ']';
};

function getDefaultMessage(msg, data) {
  if (msg === messages.PRELOAD_BEFORE) {
    return 'Preloading external module: ' + chalk.magenta(data);
  }

  if (msg === messages.PRELOAD_SUCCESS) {
    return 'Preloaded external module: ' + chalk.magenta(data)
  }

  if (msg === messages.PRELOAD_FAILURE) {
    return chalk.yellow('Failed to preload external module: ') + chalk.magenta(data);
  }

  if (msg === messages.PRELOAD_ERROR) {
    return chalk.yellow(data.toString());
  }

  if (msg === messages.LOADER_SUCCESS) {
    return 'Loaded external module: ' + chalk.magenta(data);
  }

  if (msg === messages.LOADER_FAILURE) {
    return chalk.yellow('Failed to load external module: ') + chalk.magenta(data);
  }

  if (msg === messages.LOADER_ERROR) {
    return chalk.yellow(data.toString());
  }

  if (msg === messages.NODE_FLAGS) {
    var nodeFlags = chalk.magenta(data.join(', '));
    return 'Node flags detected: ' + nodeFlags;
  }

  if (msg === messages.RESPAWNED) {
    var pid = chalk.magenta(data);
    return 'Respawned to PID: ' + pid;
  }

  if (msg === messages.GULPFILE_NOT_FOUND) {
    return chalk.red('No gulpfile found');
  }

  if (msg === messages.CWD_CHANGED) {
    return 'Working directory changed to ' + chalk.magenta(data);
  }

  if (msg === messages.UNSUPPORTED_GULP_VERSION) {
    return chalk.red('Unsupported gulp version', data)
  }

  if (msg === messages.DESCRIPTION) {
    return 'Tasks for ' + chalk.magenta(data);
  }

  if (msg === messages.GULPFILE) {
    return 'Using gulpfile ' + chalk.magenta(data);
  }

  if (msg === messages.TASK_START) {
    return "Starting '" + chalk.cyan(data.task) + "'..."
  }

  if (msg === messages.TASK_STOP) {
    return "Finished '" + chalk.cyan(data.task) + "' after " + chalk.magenta(data.duration);
  }

  if (msg === messages.TASK_ERROR) {
    return "'" + chalk.cyan(data.task) + "' " + chalk.red('errored after') + ' ' +chalk.magenta(data.duration);
  }

  if (msg === messages.TASK_MISSING) {
    if (data.similar) {
      return chalk.red('Task never defined: ' + data.task + ' - did you mean? ' + data.similar.join(', ')) + '\nTo list available tasks, try running: gulp --tasks';
    } else {
      return chalk.red('Task never defined: ' + data.task) + '\nTo list available tasks, try running: gulp --tasks';
    }
  }

  if (msg === messages.SYNC_TASK) {
    return chalk.red('The following tasks did not complete: ') + chalk.cyan(data) + "\n" + chalk.red('Did you forget to signal async completion?');
  }

  if (msg === messages.MISSING_NODE_MODULES) {
    return chalk.red('Local modules not found in') + ' ' + chalk.magenta(data);
  }

  if (msg === messages.MISSING_GULP) {
    return chalk.red('Local gulp not found in') + ' ' + chalk.magenta(data);
  }

  if (msg === messages.YARN_INSTALL) {
    return chalk.red('Try running: yarn install');
  }

  if (msg === messages.NPM_INSTALL) {
    return chalk.red('Try running: npm install');
  }

  if (msg === messages.YARN_INSTALL_GULP) {
    return chalk.red('Try running: yarn add gulp');
  }

  if (msg === messages.NPM_INSTALL_GULP) {
    return chalk.red('Try running: npm install gulp');
  }

  if (msg === messages.COMPLETION_TYPE_MISSING) {
    return 'Missing completion type';
  }

  if (msg === messages.COMPLETION_TYPE_UNKNOWN) {
    return 'echo "gulp autocompletion rules for' + " '" + data.name + "' " + 'not found"'
  }

  if (msg === messages.ARGV_ERROR) {
    return data.message;
  }

  if (msg === messages.EXEC_ERROR) {
    return data.message;
  }

  if (msg === messages.USAGE) {
    return '\n' + chalk.bold('Usage:') + ' gulp ' + chalk.blue('[options]') + ' tasks';
  }

  if (msg === messages.FLAG_HELP) {
    return chalk.gray('Show this help.');
  }

  if (msg === messages.FLAG_VERSION) {
    return chalk.gray('Print the global and local gulp versions.');
  }

  if (msg === messages.FLAG_PRELOAD) {
    return chalk.gray(
      'Will preload a module before running the gulpfile. ' +
      'This is useful for transpilers but also has other applications.'
    );
  }
  if (msg === messages.FLAG_GULPFILE) {
    return chalk.gray(
      'Manually set path of gulpfile. Useful if you have multiple gulpfiles. ' +
      'This will set the CWD to the gulpfile directory as well.'
    )
  }

  if (msg === messages.FLAG_CWD) {
    return chalk.gray(
      'Manually set the CWD. The search for the gulpfile, ' +
      'as well as the relativity of all requires will be from here.'
    );
  }

  if (msg === messages.FLAG_TASKS) {
    return chalk.gray('Print the task dependency tree for the loaded gulpfile.');
  }

  if (msg === messages.FLAG_TASKS_SIMPLE) {
    return chalk.gray('Print a plaintext list of tasks for the loaded gulpfile.');
  }

  if (msg === messages.FLAG_TASKS_JSON) {
    return chalk.gray(
      'Print the task dependency tree, ' +
      'in JSON format, for the loaded gulpfile.'
    );
  }

  if (msg === messages.FLAG_TASKS_DEPTH) {
    return chalk.gray('Specify the depth of the task dependency tree.');
  }

  if (msg === messages.FLAG_COMPACT_TASKS) {
    return chalk.gray(
      'Reduce the output of task dependency tree by printing ' +
      'only top tasks and their child tasks.'
    );
  }

  if (msg === messages.FLAG_SORT_TASKS) {
    return chalk.gray('Will sort top tasks of task dependency tree.');
  }

  if (msg === messages.FLAG_COLOR) {
    return chalk.gray(
      'Will force gulp and gulp plugins to display colors, ' +
      'even when no color support is detected.'
    );
  }

  if (msg === messages.FLAG_NO_COLOR) {
    return chalk.gray(
      'Will force gulp and gulp plugins to not display colors, ' +
      'even when color support is detected.'
    );
  }

  if (msg === messages.FLAG_SILENT) {
    return chalk.gray('Suppress all gulp logging.');
  }

  if (msg === messages.FLAG_CONTINUE) {
    return chalk.gray('Continue execution of tasks upon failure.');
  }

  if (msg === messages.FLAG_SERIES) {
    return chalk.gray('Run tasks given on the CLI in series (the default is parallel).');
  }

  if (msg === messages.FLAG_LOG_LEVEL) {
    return chalk.gray(
      'Set the loglevel. -L for least verbose and -LLLL for most verbose. ' +
      '-LLL is default.'
    );
  }

  if (msg === messages.BOX_DRAWINGS_LIGHT_UP_AND_RIGHT) {
    return chalk.white('└');
  }

  if (msg === messages.BOX_DRAWINGS_LIGHT_VERTICAL_AND_RIGHT) {
    return chalk.white('├');
  }

  if (msg === messages.BOX_DRAWINGS_LIGHT_HORIZONTAL) {
    return chalk.white('─');
  }

  if (msg === messages.BOX_DRAWINGS_LIGHT_DOWN_AND_HORIZONTAL) {
    return chalk.white('┬');
  }

  if (msg === messages.BOX_DRAWINGS_LIGHT_VERTICAL) {
    return chalk.white('│');
  }

  return msg;
}

function getDefaultTimestamp() {
  return util.inspect(new Timestamp(), { colors: !!chalk.supportsColor });
}

function buildTranslations(cfg) {
  cfg = cfg || {};

  return {
    message: function (msg, data) {
      var message;
      if (typeof cfg.message === 'function') {
        message = cfg.message(msg, data);
      }

      // If the user has provided a message, return it
      if (message) {
        return message;
      }

      // Users can filter messages by explicitly returning `false`
      if (message === false) {
        return '';
      }

      // If the user hasn't returned a message or silenced it with `false`
      // get the default message. Will return the first argument if the message
      // is not defined in the `@gulpjs/messages` package
      return getDefaultMessage(msg, data);
    },
    timestamp: function () {
      var time;
      if (typeof cfg.timestamp === 'function') {
        time = cfg.timestamp();
      }

      // If the user has provided a timestamp, return it
      if (time) {
        return time;
      }

      // Users can filter timestamps by explicitly returning `false`
      if (time === false) {
        return false;
      }

      return getDefaultTimestamp();
    }
  }
}

module.exports = buildTranslations;
