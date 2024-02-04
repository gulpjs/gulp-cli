'use strict';

/* eslint max-len: 0 */

module.exports = {
  help: {
    usage:
      '\n{TITLE: Usage:} gulp {OPTION: [options]} {TASK: tasks}',

    flags: {
      help:
        '{HELP.DESC: Show this help.}',

      version:
        '{HELP.DESC: Print the global and local gulp versions.}',

      preload:
        '{HELP.DESC: Will preload a module before running the gulpfile. ' +
        'This is useful for transpilers but also has other applications.}',

      gulpfile:
        '{HELP.DESC: Manually set path of gulpfile. Useful if you have ' +
        'multiple gulpfiles. This will set the CWD to the gulpfile ' +
        'directory as well.}',

      cwd:
        '{HELP.DESC: Manually set the CWD. The search for the gulpfile, ' +
        'as well as the relativity of all requires will be from here.}',

      tasks:
        '{HELP.DESC: Print the task dependency tree for the loaded ' +
        'gulpfile.}',

      'tasks-simple':
        '{HELP.DESC: Print a plaintext list of tasks for the loaded ' +
        'gulpfile.}',

      'tasks-json':
        '{HELP.DESC: Print the task dependency tree, in JSON format, ' +
        'for the loaded gulpfile.}',

      'tasks-depth':
        '{HELP.DESC: Specify the depth of the task dependency tree.}',

      'compact-tasks':
        '{HELP.DESC: Reduce the output of task dependency tree by ' +
        'printing only top tasks and their child tasks.}',

      'sort-tasks':
        '{HELP.DESC: Will sort top tasks of task dependency tree.}',

      color:
        '{HELP.DESC: Will force gulp and gulp plugins to display ' +
        'colors, even when no color support is detected.}',

      'no-color':
        '{HELP.DESC: Will force gulp and gulp plugins to not display ' +
        'colors, even when color support is detected.}',

      silent:
        '{HELP.DESC: Suppress all gulp logging.}',

      continue:
        '{HELP.DESC: Continue execution of tasks upon failure.}',

      series:
        '{HELP.DESC: Run tasks given on the CLI in series (the default ' +
        'is parallel).}',

      'log-level':
        '{HELP.DESC: Set the loglevel. -L for least verbose and -LLLL ' +
        'for most verbose. -LLL is default.}',
    },
  },
  tasks: {
    gulpfile:
      '{DESC: Tasks for} {PATH: {1:gulpfile path}}',

    topTask:
      '{TASKS.BRANCH: {1:branch line}}{TASKS.NAME: {2:task name}}{IF:{3:has desc}?{4:space}{TASKS.DESC: {5:task description}}}',

    option:
      '{TASKS.BRANCH: {1:branch line}}{TASKS.OPTION: {2:option name}}{IF:{3:has desc}?{4:space}…{TASKS.DESC: {5:option description}}',

    childTask:
      '{TASKS.BRANCH: {1:branch line}{TASKS.CHILD: {2:task name}}',
  },

  tasksJson: {
    gulpfile:
      'Tasks for {1:gulpfile path}',
  },

  info: {
    preloadBefore:
      '{TIMESTAMP}{DESC: Preloading external module:} {MODULE: {1:module name}}',

    preloadSuccess:
      '{TIMESTAMP}{DESC: Preloaded external module:} {MODULE: {1:module name}}',

    loaderSuccess:
      '{TIMESTAMP}{DESC: Loaded external module:} {MODULE: {1:module name}}',

    respawn:
      '{TIMESTAMP}{DESC: Node flags detected:} {OPTION: {1:node flags}}\n' +
      '{TIMESTAMP}{DESC: Respawned to PID: {PID: {2:pid}}',

    version:
      '{DESC: CLI version}: {VERSION: {1:CLI version}}\n' +
      '{DESC: Local version}: {VERSION: {2:gulp version}}',

    cwdChanged:
      '{TIMESTAMP}{DESC: Working directory changed to} {PATH: {1:cwd}}',

    usingGulpfile:
      '{TIMESTAMP}{DESC: Using gulpfile} {PATH: {1:gulpfile path}}',

    taskStart:
      '{TIMESTAMP}{DESC: Starting \'}{TASK: {1:task name}}{DESC: \'...}',

    taskStop:
      '{TIMESTAMP}{DESC: Finished \'}{TASK: {1:task name}}{DESC: \' after} ' +
      '{DURATION: {2:duration}}',
  },

  warn: {
    preloadFailure:
      '{TIMESTAMP}{WARN: Failed to preload external module:} {MODULE: {1: module name}}\n' +
      '{IF:{2:exists error}?{TIMESTAMP}{WARN: {3:error message}} ',

    loaderFailure:
      '{TIMESTAMP}{WARN: Failed to load external module:} {MODULE: {1: module name}}\n' +
      '{IF:{2:exists error}?{TIMESTAMP}{WARN: {3:error message}} ',

    taskNotComplete:
      '{TIMESTAMP}{WARN: The following tasks did not complete:} {TASK: {1}}\n' +
      '{TIMESTAMP}{WARN: Did you forget to signal async completion? }',
  },

  error: {
    gulpNotFound:
      '{TIMESTAMP}{ERROR: Local gulp not found in} {PATH: {1}}\n' +
      '{TIMESTAMP}{ERROR: Try running: {IF:{2:has yarn}?yarn add}{IF:{3:has npm}?npm install} gulp}',

    nodeModulesNotFound:
      '{TIMESTAMP}{ERROR: Local modules not found in} {PATH: {1}}\n' +
      '{TIMESTAMP}{ERROR: Try running: {IF:{2:has yarn}?yarn install}{IF:{3:has npm}?npm install}',

    gulpfileNotFound:
      '{TIMESTAMP}{ERROR: No gulpfile found}',

    badGulpVersion:
      '{TIMESTAMP}{ERROR: Unsupported gulp version {VERSION: {1}}}',

    taskError:
      '{TIMESTAMP}{ERROR: \'{1:task}\' errored after} ' +
      '{DURATION: {2:duration}}' +
      '{IF:{3:has cause}?\n{TIMESTAMP}{ERROR: {4:cause}}}',

    taskNotFound:
      '{TIMESTAMP}{ERROR: Task never defined: {1:task}}\n' +
      '{TIMESTAMP}{ERROR: To list available tasks, try running: gulp --tasks}',

    failToRun:
      '{TIMESTAMP}{ERROR: {1:cause}}\n' +
      '{TIMESTAMP}{ERROR: Please check the documentation for proper ' +
      'gulpfile formatting}',

    noCompletionType:
      'Missing completion type',

    unknownCompletionType:
      'echo "gulp autocompletion rules for \'{1:type}\' not found"',
  },
};
