module.exports = {
  message: function(msg, data) {
    // Using `Symbol.for()` to avoid node_modules
    if (msg === Symbol.for('GULP_CLI_MISSING_GULP')) {
      return 'GULP NOT FOUND IN **' + data.cwd + '**';
    }

    if (msg === Symbol.for('GULP_CLI_NPM_INSTALL_GULP')) {
      // Silence for test
      return false;
    }
  },
  timestamp: function () {
    return false;
  }
};
