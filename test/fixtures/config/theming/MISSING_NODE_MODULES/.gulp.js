module.exports = {
  message: function (data) {
    // Using `Symbol.for()` to avoid node_modules
    if (data.tag === Symbol.for('GULP_CLI_MISSING_NODE_MODULES')) {
      return 'LOCAL MODULE NOT FOUND **' + data.cwd + '**';
    }

    if (data.tag === Symbol.for('GULP_CLI_NPM_INSTALL')) {
      // Silence for test
      return false;
    }
  }
};

