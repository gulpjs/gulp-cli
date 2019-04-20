'use strict';

var expect = require('expect');
var path = require('path');
var eraseTime = require('gulp-test-tools').eraseTime;
var headLines = require('gulp-test-tools').headLines;
var runner = require('gulp-test-tools').gulpRunner;

describe('config: flag.logLevel', function() {

  describe('log level 3 by default', function() {
    var gulp = runner({ verbose: false })
      .basedir(path.join(__dirname, 'fixtures/config/flags/logLevel'))
      .gulp;

    it('Should output error log', function(done) {
      gulp('--gulpfile x')
        .run(function(err, stdout, stderr) {
          expect(err).toNotEqual(null);
          expect(stdout).toEqual('');
          expect(eraseTime(stderr)).toEqual('No gulpfile found\n');
          done();
        });
    });

    it('Should output warn log', function(done) {
      gulp('--require', 'mymodule')
        .run(function(err, stdout, stderr) {
          expect(err).toEqual(null);
          expect(stderr).toEqual('');
          expect(headLines(eraseTime(stdout), 2)).toMatch(
            'Failed to load external module mymodule\n' +
            'Error: Cannot find module \'mymodule\' from \'');
          done();
        });
    });

    it('Should output info log', function(done) {
      gulp('--harmony')
        .run(function(err, stdout, stderr) {
          expect(err).toEqual(null);
          expect(stderr).toEqual('');
          expect(headLines(eraseTime(stdout), 2)).toMatch(
           'Node flags detected: --harmony\n' +
           'Respawned to PID: ');
          done(err);
        });
    });
  });

  describe('log level 1 by config `flags.logLevel`', function() {
    var gulp = runner({ verbose: false })
      .basedir(path.join(__dirname, 'fixtures/config/flags/logLevel/L'))
      .gulp;

    it('Should output error log', function(done) {
      gulp('--gulpfile x')
        .run(function(err, stdout, stderr) {
          expect(err).toNotEqual(null);
          expect(stdout).toEqual('');
          expect(eraseTime(stderr)).toEqual('No gulpfile found\n');
          done();
        });
    });

    it('Should output warn log', function(done) {
      gulp('--require', 'mymodule')
        .run(function(err, stdout, stderr) {
          expect(err).toEqual(null);
          expect(stderr).toEqual('');
          expect(stderr).toEqual('');
          done();
        });
    });

    it('Should output info log', function(done) {
      gulp('--harmony')
        .run(function(err, stdout, stderr) {
          expect(err).toEqual(null);
          expect(stderr).toEqual('');
          expect(stdout).toEqual('');
          done(err);
        });
    });
  });

  describe('log level 2 by config `flags.logLevel`', function() {
    var gulp = runner({ verbose: false })
      .basedir(path.join(__dirname, 'fixtures/config/flags/logLevel/LL'))
      .gulp;

    it('Should output error log', function(done) {
      gulp('--gulpfile x')
        .run(function(err, stdout, stderr) {
          expect(err).toNotEqual(null);
          expect(stdout).toEqual('');
          expect(eraseTime(stderr)).toEqual('No gulpfile found\n');
          done();
        });
    });

    it('Should output warn log', function(done) {
      gulp('--require', 'mymodule')
        .run(function(err, stdout, stderr) {
          expect(err).toEqual(null);
          expect(stderr).toEqual('');
          expect(eraseTime(stdout)).toMatch(
            'Failed to load external module mymodule\n' +
            'Error: Cannot find module \'mymodule\' from \'');
          done();
        });
    });

    it('Should output info log', function(done) {
      gulp('--harmony')
        .run(function(err, stdout, stderr) {
          expect(err).toEqual(null);
          expect(stderr).toEqual('');
          expect(stdout).toEqual('');
          done(err);
        });
    });
  });

  describe('log level 3 by config `flags.logLevel`', function() {
    var gulp = runner({ verbose: false })
      .basedir(path.join(__dirname, 'fixtures/config/flags/logLevel/LLL'))
      .gulp;

    it('Should output error log', function(done) {
      gulp('--gulpfile x')
        .run(function(err, stdout, stderr) {
          expect(err).toNotEqual(null);
          expect(stdout).toEqual('');
          expect(eraseTime(stderr)).toEqual('No gulpfile found\n');
          done();
        });
    });

    it('Should output warn log', function(done) {
      gulp('--require', 'mymodule')
        .run(function(err, stdout, stderr) {
          expect(err).toEqual(null);
          expect(stderr).toEqual('');
          expect(headLines(eraseTime(stdout), 2)).toMatch(
            'Failed to load external module mymodule\n' +
            'Error: Cannot find module \'mymodule\' from \'');
          done();
        });
    });

    it('Should output info log', function(done) {
      gulp('--harmony')
        .run(function(err, stdout, stderr) {
          expect(err).toEqual(null);
          expect(stderr).toEqual('');
          expect(headLines(eraseTime(stdout), 2)).toMatch(
           'Node flags detected: --harmony\n' +
           'Respawned to PID: ');
          done(err);
        });
    });
  });

  describe('Overridden by cli flag: -L/-LL/-LLL', function() {
    it('Should not output info log by -L', function(done) {
      var gulp = runner({ verbose: false })
        .basedir(path.join(__dirname, 'fixtures/config/flags/logLevel/LLL'))
        .gulp;

      gulp('-L', '--require', 'mymodule')
        .run(function(err, stdout, stderr) {
          expect(err).toEqual(null);
          expect(stdout).toEqual('');
          expect(stderr).toEqual('');
          done(err);
        });
    });

    it('Should output info log by -LLL', function(done) {
      var gulp = runner({ verbose: false })
        .basedir(path.join(__dirname, 'fixtures/config/flags/logLevel/L'))
        .gulp;

      gulp('-LLL', '--harmony')
        .run(function(err, stdout, stderr) {
          expect(err).toEqual(null);
          expect(stderr).toEqual('');
          expect(headLines(eraseTime(stdout), 2)).toMatch(
           'Node flags detected: --harmony\n' +
           'Respawned to PID: ');
          done(err);
        });
    });
  });
});
