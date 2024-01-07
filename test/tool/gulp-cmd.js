'use strict';

var path = require('path');

function gulp(/* ... */) {
  var arr = Array.prototype.slice.apply(arguments);
  arr.unshift('node ' + path.join(__dirname, '../../bin/gulp.js'));
  return arr.join(' ');
}
gulp.debug = function(/* ... */) {
  var s = gulp.apply(null, arguments);
  console.log(s);
  return s;
}

module.exports = gulp;
