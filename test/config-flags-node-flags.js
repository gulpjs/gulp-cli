'use strict';

var expect = require('expect');
var exec = require('child_process').exec;
var path = require('path');

var sliceLines = require('./tool/slice-lines');
var gulp = require('./tool/gulp-cmd');

var baseDir = path.join(__dirname, 'fixtures/config/flags/nodeFlags');

describe('config: nodeFlags', function() {

  it('Should respawn by a node flag: --lazy', function(done) {
    var opts = { cwd: path.join(baseDir, 'string') };
    exec(gulp(), opts, cb);

    function cb(err, stdout, stderr) {
      expect(err).toBeNull();
      expect(stderr).toEqual('');
      expect(sliceLines(stdout, 0, 1)).toEqual('Node flags detected: --lazy');
      expect(sliceLines(stdout, 1, 3)).toMatch('Respawned to PID: ');
      done(err);
    }
  });

  it('Should respawn by a node flag: --lazy --trace-deprecation', function(done) {
    var opts = { cwd: path.join(baseDir, 'array') };
    exec(gulp(), opts, cb);

    function cb(err, stdout, stderr) {
      expect(err).toBeNull();
      expect(stderr).toEqual('');
      expect(sliceLines(stdout, 0, 1)).toEqual('Node flags detected: --lazy, --trace-deprecation');
      expect(sliceLines(stdout, 1, 3)).toMatch('Respawned to PID: ');
      done(err);
    }
  });

  it('Should respawn with flags in config file and command line', function(done) {
    var opts = { cwd: path.join(baseDir, 'string') };
    exec(gulp('--harmony'), opts, cb);

    function cb(err, stdout, stderr) {
      expect(err).toBeNull();
      expect(stderr).toEqual('');
      expect(sliceLines(stdout, 0, 1)).toEqual('Node flags detected: --lazy, --harmony');
      expect(sliceLines(stdout, 1, 3)).toMatch('Respawned to PID: ');
      done(err);
    }
  });

  it('Should not respawn when a node flag is specified to undefined', function(done) {
    var opts = { cwd: path.join(baseDir, 'undefined') };
    exec(gulp(), opts, cb);

    function cb(err, stdout, stderr) {
      expect(err).toBeNull();
      expect(stderr).toEqual('');
      expect(sliceLines(stdout, 0, 1)).toMatch('Using gulpfile ');
      expect(sliceLines(stdout, 1)).toEqual(
        'Starting \'default\'...\n' +
        'Default\n' +
        'Finished \'default\' after ?\n' +
      '');
      done(err);
    }
  });

  it('Should not respawn when a node flag is specified to null', function(done) {
    var opts = { cwd: path.join(baseDir, 'null') };
    exec(gulp(), opts, cb);

    function cb(err, stdout, stderr) {
      expect(err).toBeNull();
      expect(stderr).toEqual('');
      expect(sliceLines(stdout, 0, 1)).toMatch('Using gulpfile ');
      expect(sliceLines(stdout, 1)).toEqual(
        'Starting \'default\'...\n' +
        'Default\n' +
        'Finished \'default\' after ?\n' +
      '');
      done(err);
    }
  });
});
