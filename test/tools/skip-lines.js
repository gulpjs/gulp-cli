'use strict';

module.exports = function(text, nskip) {
  text = text.replace(/(\r\n|\r|\n)/gm, '\n');
  for (var i = 0; i < nskip; i++) {
    var index = text.indexOf('\n');
    if (index < 0) {
      return '';
    }
    text = text.slice(index + 1);
  }
  return text;
};
