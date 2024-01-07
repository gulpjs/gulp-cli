'use strict';

module.exports = function(text) {
  return ('\n' + text).replace(/(\r\n|\r|\n)\[[0-9:]{8}\] /g, '\n').slice(1);
};
