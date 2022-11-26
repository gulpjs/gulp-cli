'use strict';

var expect = require('expect');
var exec = require('child_process').exec;
var path = require('path');

var sliceLines = require('./tool/slice-lines');
var eraseTime = require('./tool/erase-time');
var cmdSep = require('./tool/cmd-sep');

var gulpCmd = 'node ' + path.join(__dirname, '../bin/gulp.js');
var baseDir = path.join(__dirname, 'fixtures/config/flags/logLevel');

describe('config: flag.logLevel', function() {

  describe('log level 3 by default', function() {

    it('Should output error log', function(done) {
      exec([
        'cd ' + baseDir + cmdSep,
        gulpCmd,
        '--gulpfile x',
      ].join(' '), cb);

      function cb(err, stdout, stderr) {
        expect(err).toNotEqual(null);
        expect(stdout).toEqual('');
        expect(eraseTime(stderr)).toEqual('No gulpfile found\n');
        done();
      }
    });

    it('Should output warn log', function(done) {
      exec([
        'cd ' + baseDir + cmdSep,
        gulpCmd,
        '--preload mymodule',
      ].join(' '), cb);

      function cb(err, stdout, stderr) {
        expect(err).toEqual(null);
        expect(stderr).toEqual('');
        expect(sliceLines(stdout, 1, 3)).toMatch(
          'Failed to preload external module: mymodule\n' +
          'Error: Cannot find module \'mymodule\' from \'');
        done();
      }
    });

    it('Should output info log', function(done) {
      exec([
        'cd ' + baseDir + cmdSep,
        gulpCmd,
        '--harmony',
      ].join(' '), cb);

      function cb(err, stdout, stderr) {
        expect(err).toEqual(null);
        expect(stderr).toEqual('');
        expect(sliceLines(stdout, 0, 2)).toMatch(
         'Node flags detected: --harmony\n' +
         'Respawned to PID: ');
        done(err);
      }
    });
  });

  describe('log level 1 by config `flags.logLevel`', function() {

    it('Should output error log', function(done) {
      exec([
        'cd ' + baseDir + cmdSep,
        gulpCmd,
        '--gulpfile x',
      ].join(' '), cb);

      function cb(err, stdout, stderr) {
        expect(err).toNotEqual(null);
        expect(stdout).toEqual('');
        expect(eraseTime(stderr)).toEqual('No gulpfile found\n');
        done();
      }
    });

    it('Should output warn log', function(done) {
      exec([
        'cd ' + path.join(baseDir, 'L') + cmdSep,
        gulpCmd,
        '--preload mymodule',
      ].join(' '), cb);

      function cb(err, stdout, stderr) {
        expect(err).toEqual(null);
        expect(stderr).toEqual('');
        expect(stderr).toEqual('');
        done();
      }
    });

    it('Should output info log', function(done) {
      exec([
        'cd ' + path.join(baseDir, 'L') + cmdSep,
        gulpCmd,
        '--harmony',
      ].join(' '), cb);

      function cb(err, stdout, stderr) {
        expect(err).toEqual(null);
        expect(stderr).toEqual('');
        expect(stdout).toEqual('');
        done(err);
      }
    });
  });

  describe('log level 2 by config `flags.logLevel`', function() {
    it('Should output error log', function(done) {
      exec([
        'cd ' + path.join(baseDir, 'LL') + cmdSep,
        gulpCmd,
        '--gulpfile x',
      ].join(' '), cb);

      function cb(err, stdout, stderr) {
        expect(err).toNotEqual(null);
        expect(stdout).toEqual('');
        expect(eraseTime(stderr)).toEqual('No gulpfile found\n');
        done();
      }
    });

    it('Should output warn log', function(done) {
      exec([
        'cd ' + path.join(baseDir, 'LL') + cmdSep,
        gulpCmd,
        '--preload mymodule',
      ].join(' '), cb);

      function cb(err, stdout, stderr) {
        expect(err).toEqual(null);
        expect(stderr).toEqual('');
        expect(eraseTime(stdout)).toMatch(
          'Failed to preload external module: mymodule\n' +
          'Error: Cannot find module \'mymodule\' from \'');
        done();
      }
    });

    it('Should output info log', function(done) {
      exec([
        'cd ' + path.join(baseDir, 'LL') + cmdSep,
        gulpCmd,
        '--harmony',
      ].join(' '), cb);

      function cb(err, stdout, stderr) {
        expect(err).toEqual(null);
        expect(stderr).toEqual('');
        expect(stdout).toEqual('');
        done(err);
      }
    });
  });

  describe('log level 3 by config `flags.logLevel`', function() {
    it('Should output error log', function(done) {
      exec([
        'cd ' + path.join(baseDir, 'LLL') + cmdSep,
        gulpCmd,
        '--gulpfile x',
      ].join(' '), cb);

      function cb(err, stdout, stderr) {
        expect(err).toNotEqual(null);
        expect(stdout).toEqual('');
        expect(eraseTime(stderr)).toEqual('No gulpfile found\n');
        done();
      }
    });

    it('Should output warn log', function(done) {
      exec([
        'cd ' + path.join(baseDir, 'LLL') + cmdSep,
        gulpCmd,
        '--preload mymodule',
      ].join(' '), cb);

      function cb(err, stdout, stderr) {
        expect(err).toEqual(null);
        expect(stderr).toEqual('');
        expect(eraseTime(stdout)).toMatch(
          'Failed to preload external module: mymodule\n' +
          'Error: Cannot find module \'mymodule\' from \'');
        done();
      }
    });

    it('Should output info log', function(done) {
      exec([
        'cd ' + path.join(baseDir, 'LLL') + cmdSep,
        gulpCmd,
        '--harmony',
      ].join(' '), cb);

      function cb(err, stdout, stderr) {
        expect(err).toEqual(null);
        expect(stderr).toEqual('');
        expect(sliceLines(stdout, 0, 2)).toMatch(
          'Node flags detected: --harmony\n' +
          'Respawned to PID: ');
        done(err);
      }
    });
  });

  describe('Overridden by cli flag: -L/-LL/-LLL', function() {
    it('Should not output info log by -L', function(done) {
      exec([
        'cd ' + path.join(baseDir, 'LLL') + cmdSep,
        gulpCmd,
        '-L',
        '--preload mymodule',
      ].join(' '), cb);

      function cb(err, stdout, stderr) {
        expect(err).toEqual(null);
        expect(stdout).toEqual('');
        expect(stderr).toEqual('');
        done(err);
      }
    });

    it('Should output info log by -LLL', function(done) {
      exec([
        'cd ' + path.join(baseDir, 'L') + cmdSep,
        gulpCmd,
        '-LLL',
        '--harmony',
      ].join(' '), cb);

      function cb(err, stdout, stderr) {
        expect(err).toEqual(null);
        expect(stderr).toEqual('');
        expect(sliceLines(stdout, 0, 2)).toMatch(
         'Node flags detected: --harmony\n' +
         'Respawned to PID: ');
        done(err);
      }
    });
  });
});
