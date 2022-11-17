'use strict';

var expect = require('expect');
var exec = require('child_process').exec;
var path = require('path');

var sliceLines = require('./tool/slice-lines');
var cmdSep = require('./tool/cmd-sep');

var gulpCmd = 'node ' + path.join(__dirname, '../bin/gulp.js');
var baseDir = path.join(__dirname, 'fixtures/config/flags/nodeFlags');

describe('config: nodeFlags', function() {

  it('Should respawn by a node flag: --lazy', function(done) {
    exec([
      'cd ' + path.join(baseDir, 'string') + cmdSep,
      gulpCmd,
    ].join(' '), cb);

    function cb(err, stdout, stderr) {
      expect(err).toEqual(null);
      expect(stderr).toEqual('');
      expect(sliceLines(stdout, 0, 1)).toEqual('Node flags detected: --lazy');
      expect(sliceLines(stdout, 1, 3)).toMatch('Respawned to PID: ');
      done(err);
    }
  });

  it('Should respawn by a node flag: --lazy --trace-deprecation', function(done) {
    exec([
      'cd ' + path.join(baseDir, 'array') + cmdSep,
      gulpCmd,
    ].join(' '), cb);

    function cb(err, stdout, stderr) {
      expect(err).toEqual(null);
      expect(stderr).toEqual('');
      expect(sliceLines(stdout, 0, 1)).toEqual('Node flags detected: --lazy, --trace-deprecation');
      expect(sliceLines(stdout, 1, 3)).toMatch('Respawned to PID: ');
      done(err);
    }
  });

  it('Should respawn with flags in config file and command line', function(done) {
    exec([
      'cd ' + path.join(baseDir, 'string') + cmdSep,
      gulpCmd,
      '--harmony',
    ].join(' '), cb);

    function cb(err, stdout, stderr) {
      expect(err).toEqual(null);
      expect(stderr).toEqual('');
      expect(sliceLines(stdout, 0, 1)).toEqual('Node flags detected: --lazy, --harmony');
      expect(sliceLines(stdout, 1, 3)).toMatch('Respawned to PID: ');
      done(err);
    }
  });

  it('Should not respawn when a node flag is specified to undefined', function(done) {
    exec([
      'cd ' + path.join(baseDir, 'undefined') + cmdSep,
      gulpCmd,
    ].join(' '), cb);

    function cb(err, stdout, stderr) {
      expect(err).toEqual(null);
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
    exec([
      'cd ' + path.join(baseDir, 'null') + cmdSep,
      gulpCmd,
    ].join(' '), cb);

    function cb(err, stdout, stderr) {
      expect(err).toEqual(null);
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
