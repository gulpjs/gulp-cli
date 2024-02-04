'use strict';

function checkTaskNotFound(err) {
  var result = /^Task never defined: +(.*)$/.exec(err.message);
  /* istanbul ignore else */
  if (result) {
    return result[1];
  }
}

module.exports = checkTaskNotFound;
