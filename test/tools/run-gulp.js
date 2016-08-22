'use strict';

var child = require('child_process');
var path = require('path');
var os = require('os');


var cmdsep = '; ';
var escapeBs = path.join;

if (os.platform() === 'win32') {
  cmdsep = ' & ';
  escapeBs = function() {
    var pth = path.join.apply(path, arguments);
    return pth.replace(/\\/g, '\\\\');
  };
}


var regexpInsEol = new RegExp(cmdsep, 'g');

function insertEol(cmd) {
  return cmd.replace(regexpInsEol, cmdsep + '\n');
}


var gulpPath = path.join(__dirname, '../../bin/gulp.js');

module.exports = function(opt) {
  opt = opt || {};
  var inst = {};
  inst.basedir = basedirFn;
  inst.chdir = chdirFn;
  inst.gulp = gulpFn;
  inst._command = '';
  inst._verbose = !!opt.verbose;
  inst._basedir = path.join(__dirname, '..'); // Test directory
  return inst;

  function basedirFn(dir) {
    inst._basedir = dir;
    return {
      chdir: chdirFn,
      gulp: gulpFn,
    };
  }

  function chdirFn(dir) {
    inst._command = 'cd ' + escapeBs(dir);
    return { gulp: gulpFn };
  }

  function gulpFn(/*...args*/) {
    if (inst._command) {
      inst._command += cmdsep;
    }
    inst._command += 'node ' + escapeBs(gulpPath);
    for (var i = 0, n = arguments.length; i < n; i++) {
      inst._command += ' ' + arguments[i];
    }
    return { run: runFn };
  }

  function runFn(cb) {
    var cmd = '';
    if (inst._basedir) {
      cmd += 'cd ' + escapeBs(path.resolve(inst._basedir)) + cmdsep;
    }
    cmd += inst._command;

    if (!inst._verbose) {
      child.exec(cmd, cb);
      inst._command = '';
      return;
    }

    console.log('---- command');
    console.log(insertEol(cmd));
    child.exec(cmd, function(err, stdout, stderr) {
      console.log('---- error');
      console.log(err);
      console.log('---- stdout');
      console.log(stdout);
      console.log('---- stderr');
      console.log(stderr);
      console.log('----.');
      cb(err, stdout, stderr);
      inst._command = '';
    });
  }
};
