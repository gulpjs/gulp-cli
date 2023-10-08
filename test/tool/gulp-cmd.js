'use strict';

var os = require('os');
var path = require('path');

var cmdSep = os.platform() === 'win32' ? '& ' : '; ';

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

function cd(/* ... */) {
  var cd = 'cd ' + path.join.apply(null, arguments) + cmdSep;
  var g = function(/* ... */) {
    return cd + gulp.apply(null, arguments);
  };
  g.debug = function(/* ... */) {
    var s = g.apply(null, arguments);
    console.log(s);
    return s;
  };
  return { gulp: g };
}

module.exports = { cd: cd, gulp: gulp };
