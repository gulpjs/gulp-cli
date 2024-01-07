'use strict';

var expect = require('expect');
var exec = require('child_process').exec;
var path = require('path');

var sliceLines = require('./tool/slice-lines');
var eraseTime = require('./tool/erase-time');
var gulp = require('./tool/gulp-cmd');

var baseDir = path.join(__dirname, 'fixtures/config/flags/logLevel');

describe('config: flag.logLevel', function() {

  describe('log level 3 by default', function() {

    it('Should output error log', function(done) {
      var opts = { cwd: baseDir };
      exec(gulp('--gulpfile x'), opts, cb);

      function cb(err, stdout, stderr) {
        expect(err).not.toBeNull();
        expect(stdout).toEqual('');
        expect(eraseTime(stderr)).toEqual('No gulpfile found\n');
        done();
      }
    });

    it('Should output warn log', function(done) {
      var opts = { cwd: baseDir };
      exec(gulp('--preload mymodule'), opts, cb);

      function cb(err, stdout, stderr) {
        expect(err).toBeNull();
        expect(stderr).toEqual('');
        expect(sliceLines(stdout, 1, 3)).toMatch(
          'Failed to preload external module: mymodule\n' +
          'Error: Cannot find module \'mymodule\' from \'');
        done();
      }
    });

    it('Should output info log', function(done) {
      var opts = { cwd: baseDir };
      exec(gulp('--harmony'), opts, cb);

      function cb(err, stdout, stderr) {
        expect(err).toBeNull();
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
      var opts = { cwd: baseDir };
      exec(gulp('--gulpfile x'), opts, cb);

      function cb(err, stdout, stderr) {
        expect(err).not.toBeNull();
        expect(stdout).toEqual('');
        expect(eraseTime(stderr)).toEqual('No gulpfile found\n');
        done();
      }
    });

    it('Should output warn log', function(done) {
      var opts = { cwd: path.join(baseDir, 'L') };
      exec(gulp('--preload mymodule'), opts, cb);

      function cb(err, stdout, stderr) {
        expect(err).toBeNull();
        expect(stderr).toEqual('');
        expect(stderr).toEqual('');
        done();
      }
    });

    it('Should output info log', function(done) {
      var opts = { cwd: path.join(baseDir, 'L') };
      exec(gulp('--harmony'), opts, cb);

      function cb(err, stdout, stderr) {
        expect(err).toBeNull();
        expect(stderr).toEqual('');
        expect(stdout).toEqual('');
        done(err);
      }
    });
  });

  describe('log level 2 by config `flags.logLevel`', function() {
    it('Should output error log', function(done) {
      var opts = { cwd: path.join(baseDir, 'LL') };
      exec(gulp('--gulpfile x'), opts, cb);

      function cb(err, stdout, stderr) {
        expect(err).not.toBeNull();
        expect(stdout).toEqual('');
        expect(eraseTime(stderr)).toEqual('No gulpfile found\n');
        done();
      }
    });

    it('Should output warn log', function(done) {
      var opts = { cwd: path.join(baseDir, 'LL') };
      exec(gulp('--preload mymodule'), opts, cb);

      function cb(err, stdout, stderr) {
        expect(err).toBeNull();
        expect(stderr).toEqual('');
        expect(eraseTime(stdout)).toMatch(
          'Failed to preload external module: mymodule\n' +
          'Error: Cannot find module \'mymodule\' from \'');
        done();
      }
    });

    it('Should output info log', function(done) {
      var opts = { cwd: path.join(baseDir, 'LL') };
      exec(gulp('--harmony'), opts, cb);

      function cb(err, stdout, stderr) {
        expect(err).toBeNull();
        expect(stderr).toEqual('');
        expect(stdout).toEqual('');
        done(err);
      }
    });
  });

  describe('log level 3 by config `flags.logLevel`', function() {
    it('Should output error log', function(done) {
      var opts = { cwd: path.join(baseDir, 'LLL') };
      exec(gulp('--gulpfile x'), opts, cb);

      function cb(err, stdout, stderr) {
        expect(err).not.toBeNull();
        expect(stdout).toEqual('');
        expect(eraseTime(stderr)).toEqual('No gulpfile found\n');
        done();
      }
    });

    it('Should output warn log', function(done) {
      var opts = { cwd: path.join(baseDir, 'LLL') };
      exec(gulp('--preload mymodule'), opts, cb);

      function cb(err, stdout, stderr) {
        expect(err).toBeNull();
        expect(stderr).toEqual('');
        expect(eraseTime(stdout)).toMatch(
          'Failed to preload external module: mymodule\n' +
          'Error: Cannot find module \'mymodule\' from \'');
        done();
      }
    });

    it('Should output info log', function(done) {
      var opts = { cwd: path.join(baseDir, 'LLL') };
      exec(gulp('--harmony'), opts, cb);

      function cb(err, stdout, stderr) {
        expect(err).toBeNull();
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
      var opts = { cwd: path.join(baseDir, 'LLL') };
      exec(gulp('-L', '--preload mymodule'), opts, cb);

      function cb(err, stdout, stderr) {
        expect(err).toBeNull();
        expect(stdout).toEqual('');
        expect(stderr).toEqual('');
        done(err);
      }
    });

    it('Should output info log by -LLL', function(done) {
      var opts = { cwd: path.join(baseDir, 'L') };
      exec(gulp('-LLL', '--harmony'), opts, cb);

      function cb(err, stdout, stderr) {
        expect(err).toBeNull();
        expect(stderr).toEqual('');
        expect(sliceLines(stdout, 0, 2)).toMatch(
         'Node flags detected: --harmony\n' +
         'Respawned to PID: ');
        done(err);
      }
    });
  });
});
