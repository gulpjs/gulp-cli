'use strict';

var expect = require('expect');
var exec = require('child_process').exec;
var path = require('path');

var sliceLines = require('./tool/slice-lines');
var gulp = require('./tool/gulp-cmd');

var baseDir = path.join(__dirname, 'fixtures/gulpfiles');

describe('flags: v8flags', function() {

  it('Should respawn by a v8flag: --lazy', function(done) {
    var opts = { cwd: baseDir };
    exec(gulp('--lazy'), opts, cb);

    function cb(err, stdout, stderr) {
      expect(err).toBeNull();
      expect(stderr).toEqual('');
      expect(sliceLines(stdout, 0, 1)).toEqual('Node flags detected: --lazy');
      expect(sliceLines(stdout, 1, 3)).toMatch('Respawned to PID: ');
      done(err);
    }
  });

  it('Should respawn by v8flags: --lazy --harmony', function(done) {
    var opts = { cwd: baseDir };
    exec(gulp('--lazy --harmony'), opts, cb);

    function cb(err, stdout, stderr) {
      expect(err).toBeNull();
      expect(stderr).toEqual('');
      expect(sliceLines(stdout, 0, 1)).toEqual('Node flags detected: --harmony, --lazy');
      expect(sliceLines(stdout, 1, 3)).toMatch('Respawned to PID: ');
      done(err);
    }
  });
});
