'use strict';

var expect = require('expect');
var path = require('path');
var eraseTime = require('gulp-test-tools').eraseTime;
var runner = require('gulp-test-tools').gulpRunner;
var stripAnsi = require('../lib/shared/ansi').strip;

describe('config: flag.logLevel', function() {

  describe('log level 3 by default', function() {
    it('Should output error log', function(done) {
      runner({ verbose: false })
        .gulp('--gulpfile x')
        .run(function(err, stdout, stderr) {
          expect(err).toNotEqual(null);
          expect(stdout).toEqual('');
          expect(eraseTime(stripAnsi(stderr))).toEqual('No gulpfile found\n');
          done();
        });
    });

    it('Should output warn log', function(done) {
      var packageJsonPath = path.resolve(__dirname, 'fixtures/packages',
        'invalid-package.json');

      runner({ verbose: false })
        .gulp('--verify', packageJsonPath)
        .run(function(err, stdout, stderr) {
          expect(err).toNotEqual(null);
          expect(eraseTime(stripAnsi(stdout))).toEqual(
            'Verifying plugins in ' + packageJsonPath + '\n' +
            'Blacklisted plugins found in this project:\n' +
            'gulp-blink: deprecated. use \`blink` instead.\n');
          expect(stderr).toEqual('');
          done();
        });
    });

    it('Should output info log', function(done) {
      var packageJsonPath = path.resolve(__dirname, 'fixtures/packages',
        'valid-package.json');

      runner({ verbose: false })
        .gulp('--verify', packageJsonPath)
        .run(function(err, stdout, stderr) {
          expect(err).toEqual(null);
          expect(eraseTime(stripAnsi(stdout))).toEqual(
            'Verifying plugins in ' + packageJsonPath + '\n' +
            'There are no blacklisted plugins in this project\n');
          expect(stderr).toEqual('');
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
          expect(eraseTime(stripAnsi(stderr))).toEqual('No gulpfile found\n');
          done();
        });
    });

    it('Should output warn log', function(done) {
      var packageJsonPath = path.resolve(__dirname, 'fixtures/packages',
        'invalid-package.json');

      gulp('--verify', packageJsonPath)
        .run(function(err, stdout, stderr) {
          expect(err).toNotEqual(null);
          expect(stdout).toEqual('');
          expect(stderr).toEqual('');
          done();
        });
    });

    it('Should output info log', function(done) {
      var packageJsonPath = path.resolve(__dirname, 'fixtures/packages',
        'valid-package.json');

      gulp('--verify', packageJsonPath)
        .run(function(err, stdout, stderr) {
          expect(err).toEqual(null);
          expect(stdout).toEqual('');
          expect(stderr).toEqual('');
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
          expect(eraseTime(stripAnsi(stderr))).toEqual('No gulpfile found\n');
          done();
        });
    });

    it('Should output warn log', function(done) {
      var packageJsonPath = path.resolve(__dirname, 'fixtures/packages',
        'invalid-package.json');

      gulp('--verify', packageJsonPath)
        .run(function(err, stdout, stderr) {
          expect(err).toNotEqual(null);
          expect(eraseTime(stripAnsi(stdout))).toEqual(
            'Blacklisted plugins found in this project:\n' +
            'gulp-blink: deprecated. use \`blink` instead.\n');
          expect(stderr).toEqual('');
          done();
        });
    });

    it('Should output info log', function(done) {
      var packageJsonPath = path.resolve(__dirname, 'fixtures/packages',
        'valid-package.json');

      gulp('--verify', packageJsonPath)
        .run(function(err, stdout, stderr) {
          expect(err).toEqual(null);
          expect(stdout).toEqual('');
          expect(stderr).toEqual('');
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
          expect(eraseTime(stripAnsi(stderr))).toEqual('No gulpfile found\n');
          done();
        });
    });

    it('Should output warn log', function(done) {
      var packageJsonPath = path.resolve(__dirname, 'fixtures/packages',
        'invalid-package.json');

      gulp('--verify', packageJsonPath)
        .run(function(err, stdout, stderr) {
          expect(err).toNotEqual(null);
          expect(eraseTime(stripAnsi(stdout))).toEqual(
            'Verifying plugins in ' + packageJsonPath + '\n' +
            'Blacklisted plugins found in this project:\n' +
            'gulp-blink: deprecated. use \`blink` instead.\n');
          expect(stderr).toEqual('');
          done();
        });
    });

    it('Should output info log', function(done) {
      var packageJsonPath = path.resolve(__dirname, 'fixtures/packages',
        'valid-package.json');

      gulp('--verify', packageJsonPath)
        .run(function(err, stdout, stderr) {
          expect(err).toEqual(null);
          expect(eraseTime(stripAnsi(stdout))).toEqual(
            'Verifying plugins in ' + packageJsonPath + '\n' +
            'There are no blacklisted plugins in this project\n');
          expect(stderr).toEqual('');
          done(err);
        });
    });
  });
});
