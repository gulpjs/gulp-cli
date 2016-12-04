'use strict';

var path = require('path');

module.exports = {

  description: {
    validate: function(value) {
      if (typeof value !== 'string') {
        throw new TypeError('config.description must be a string: ' + value);
      }
      if (!value) {
        throw new Error('config.description requires a value.');
      }
      return value;
    },
  },

  'flags.silent': {
    validate: function(value) {
      if (typeof value !== 'boolean') {
        throw new TypeError('config.flags.silent must be a boolean: ' + value);
      }
      return value;
    },
  },

  'flags.gulpfile': {
    validate: function(value, configFile) {
      if (typeof value !== 'string') {
        throw new TypeError(
          'config.flags.gulpfile must be a string: ' + value);
      }
      if (!value) {
        throw new Error('config.flags.gulpfile requires a value.');
      }
      return path.resolve(path.dirname(configFile), value);
    },
  },
};
