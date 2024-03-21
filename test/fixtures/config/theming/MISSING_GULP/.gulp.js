module.exports = {
  message: function (data) {
    // Using `Symbol.for()` to avoid node_modules
    if (data.tag === Symbol.for('GULP_CLI_MISSING_GULP')) {
      return 'GULP NOT FOUND IN **' + data.cwd + '**';
    }

    if (data.tag === Symbol.for('GULP_CLI_NPM_INSTALL_GULP')) {
      // Silence for test
      return false;
    }
  },
  timestamp: function () {
    return false;
  }
};
