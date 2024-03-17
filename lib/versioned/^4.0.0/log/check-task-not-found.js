'use strict';

function checkTaskNotFound(err) {
  /* istanbul ignore if */
  if (!err || !err.message) {
    return undefined;
  }
  var fixed0 = 'Task never defined: ';
  var fixed1 = ' - did you mean? ';

  if (err.message.startsWith(fixed0)) {
    var target = err.message.slice(fixed0.length);
    var similar = undefined;

    var index = target.indexOf(fixed1);
    if (index >= 0) {
      similar = target.slice(index + fixed1.length).split(', ');
      target = target.slice(0, index);
    }

    if (similar && similar.length) {
      return { target: target, similar: similar };
    } else {
      return { target: target };
    }
  }
}

module.exports = checkTaskNotFound;
