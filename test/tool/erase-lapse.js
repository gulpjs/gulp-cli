"use strict";

module.exports = function (text) {
  return (text + "\n")
    .replace(/ after [0-9.]+ (s|ms|μs|min)(\r\n|\r|\n)/g, " after ?\n")
    .slice(0, -1);
};
