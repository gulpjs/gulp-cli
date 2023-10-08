'use strict';

var expect = require('expect');
var exec = require('child_process').exec;
var path = require('path');

var sliceLines = require('./tool/slice-lines');
var eraseTime = require('./tool/erase-time');
var cd = require('./tool/gulp-cmd').cd;

var baseDir = path.join(__dirname, 'fixtures/config/flags/logLevel');

describe('config: flag.logLevel', function() {

  describe('log level 3 by default', function() {

    it('Should output error log', function(done) {
      exec(cd(baseDir).gulp('--gulpfile x'), cb);

      function cb(err, stdout, stderr) {
        expect(err).not.toBeNull();
        expect(stdout).toEqual('');
        expect(eraseTime(stderr)).toEqual('No gulpfile found\n');
        done();
      }
    });

    it('Should output warn log', function(done) {
      exec(cd(baseDir).gulp('--preload mymodule'), cb);

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
      exec(cd(baseDir).gulp('--harmony'), cb);

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
      exec(cd(baseDir).gulp('--gulpfile x'), cb);

      function cb(err, stdout, stderr) {
        expect(err).not.toBeNull();
        expect(stdout).toEqual('');
        expect(eraseTime(stderr)).toEqual('No gulpfile found\n');
        done();
      }
    });

    it('Should output warn log', function(done) {
      exec(cd(baseDir, 'L').gulp('--preload mymodule'), cb);

      function cb(err, stdout, stderr) {
        expect(err).toBeNull();
        expect(stderr).toEqual('');
        expect(stderr).toEqual('');
        done();
      }
    });

    it('Should output info log', function(done) {
      exec(cd(baseDir, 'L').gulp('--harmony'), cb);

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
      exec(cd(baseDir, 'LL').gulp('--gulpfile x'), cb);

      function cb(err, stdout, stderr) {
        expect(err).not.toBeNull();
        expect(stdout).toEqual('');
        expect(eraseTime(stderr)).toEqual('No gulpfile found\n');
        done();
      }
    });

    it('Should output warn log', function(done) {
      exec(cd(baseDir, 'LL').gulp('--preload mymodule'), cb);

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
      exec(cd(baseDir, 'LL').gulp('--harmony'), cb);

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
      exec(cd(baseDir, 'LLL').gulp('--gulpfile x'), cb);

      function cb(err, stdout, stderr) {
        expect(err).not.toBeNull();
        expect(stdout).toEqual('');
        expect(eraseTime(stderr)).toEqual('No gulpfile found\n');
        done();
      }
    });

    it('Should output warn log', function(done) {
      exec(cd(baseDir, 'LLL').gulp('--preload mymodule'), cb);

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
      exec(cd(baseDir, 'LLL').gulp('--harmony'), cb);

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
      exec(cd(baseDir, 'LLL').gulp('-L', '--preload mymodule'), cb);

      function cb(err, stdout, stderr) {
        expect(err).toBeNull();
        expect(stdout).toEqual('');
        expect(stderr).toEqual('');
        done(err);
      }
    });

    it('Should output info log by -LLL', function(done) {
      exec(cd(baseDir, 'L').gulp('-LLL', '--harmony'), cb);

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
