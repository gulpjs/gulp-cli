'use strict';

var expect = require('expect');
var runner = require('gulp-test-tools').gulpRunner;
var skipLines = require('gulp-test-tools').skipLines;
var headLines = require('gulp-test-tools').headLines;
var eraseTime = require('gulp-test-tools').eraseTime;
var eraseLapse = require('gulp-test-tools').eraseLapse;
var path = require('path');

describe('flag: --require', function() {

  it('requires module before running gulpfile', function(done) {
    runner({ verbose: false })
      .gulp('--require ../test-module.js', '--cwd ./test/fixtures/gulpfiles')
      .run(cb);

    function cb(err, stdout, stderr) {
      expect(err).toEqual(null);
      expect(stderr).toEqual('');
      var insideLog = headLines(stdout, 1);
      expect(insideLog).toEqual('inside test module');

      var requireLog = eraseTime(headLines(stdout, 1, 1));
      expect(requireLog).toEqual(
        'Requiring external module ../test-module.js');

      var chgWorkdirLog = headLines(stdout, 1, 2);
      var workdir = 'test/fixtures/gulpfiles'.replace(/\//g, path.sep);
      expect(chgWorkdirLog).toMatch('Working directory changed to ');
      expect(chgWorkdirLog).toMatch(workdir);

      stdout = eraseLapse(eraseTime(skipLines(stdout, 4)));
      expect(stdout).toEqual(
        'Starting \'default\'...\n' +
         'Starting \'test1\'...\n' +
          'Starting \'noop\'...\n' +
          'Finished \'noop\' after ?\n' +
         'Finished \'test1\' after ?\n' +
         'Starting \'test3\'...\n' +
          'Starting \'described\'...\n' +
          'Finished \'described\' after ?\n' +
         'Finished \'test3\' after ?\n' +
         'Starting \'noop\'...\n' +
         'Finished \'noop\' after ?\n' +
        'Finished \'default\' after ?\n' +
        ''
      );
      done(err);
    }
  });

  it('can require multiple modules before running gulpfile', function(done) {
    runner({ verbose: false })
      .gulp('--require ../test-module.js', '--require ../test-module-2.js', '--cwd ./test/fixtures/gulpfiles')
      .run(cb);

    function cb(err, stdout, stderr) {
      expect(err).toEqual(null);
      expect(stderr).toEqual('');
      var insideLog = headLines(stdout, 1);
      expect(insideLog).toEqual('inside test module');

      var requireLog = eraseTime(headLines(stdout, 1, 1));
      expect(requireLog).toEqual(
        'Requiring external module ../test-module.js');

      var insideLog2 = headLines(stdout, 1, 2);
      expect(insideLog2).toEqual('inside test module 2');

      var requireLog2 = eraseTime(headLines(stdout, 1, 3));
      expect(requireLog2).toEqual(
        'Requiring external module ../test-module-2.js');

      done(err);
    }
  });

  it('warns if module doesn\'t exist', function(done) {
    runner({ verbose: false })
      .gulp('--require ./null-module.js', '--cwd ./test/fixtures/gulpfiles')
      .run(cb);

    function cb(err, stdout, stderr) {
      expect(err).toEqual(null);
      expect(stderr).toEqual('');
      stdout = eraseLapse(eraseTime(stdout));
      expect(stdout).toMatch('Failed to load external module ./null-module.js');
      expect(stdout).toMatch('Error: Cannot find module \'./null-module.js\'');
      expect(stdout).toNotMatch('inside test module');
      expect(stdout).toNotMatch('Requiring external module ../test-module.js');

      var chgWorkdirLog = headLines(stdout, 3);
      var workdir = 'test/fixtures/gulpfiles'.replace(/\//g, path.sep);
      expect(chgWorkdirLog).toMatch('Working directory changed to ');
      expect(chgWorkdirLog).toMatch(workdir);

      stdout = eraseLapse(eraseTime(skipLines(stdout, 4)));
      expect(stdout).toEqual(
        'Starting \'default\'...\n' +
         'Starting \'test1\'...\n' +
          'Starting \'noop\'...\n' +
          'Finished \'noop\' after ?\n' +
         'Finished \'test1\' after ?\n' +
         'Starting \'test3\'...\n' +
          'Starting \'described\'...\n' +
          'Finished \'described\' after ?\n' +
         'Finished \'test3\' after ?\n' +
         'Starting \'noop\'...\n' +
         'Finished \'noop\' after ?\n' +
        'Finished \'default\' after ?\n' +
        ''
      );

      done(err);
    }
  });

  it('warns if module throw some error', function(done) {
    runner({ verbose: false })
      .gulp('--require ../test-error-module.js', '--cwd ./test/fixtures/gulpfiles')
      .run(cb);

    function cb(err, stdout, stderr) {
      stdout = eraseLapse(eraseTime(stdout));
      expect(err).toEqual(null);
      expect(stderr).toEqual('');
      expect(stdout).toMatch('Failed to load external module ../test-error-module.js');
      expect(stdout).toMatch('Error: from error module');
      expect(stdout).toNotMatch('inside error module');

      var chgWorkdirLog = headLines(stdout, 3);
      var workdir = 'test/fixtures/gulpfiles'.replace(/\//g, path.sep);
      expect(chgWorkdirLog).toMatch('Working directory changed to ');
      expect(chgWorkdirLog).toMatch(workdir);

      stdout = eraseLapse(eraseTime(skipLines(stdout, 4)));
      expect(stdout).toEqual(
        'Starting \'default\'...\n' +
         'Starting \'test1\'...\n' +
          'Starting \'noop\'...\n' +
          'Finished \'noop\' after ?\n' +
         'Finished \'test1\' after ?\n' +
         'Starting \'test3\'...\n' +
          'Starting \'described\'...\n' +
          'Finished \'described\' after ?\n' +
         'Finished \'test3\' after ?\n' +
         'Starting \'noop\'...\n' +
         'Finished \'noop\' after ?\n' +
        'Finished \'default\' after ?\n' +
        ''
      );

      done(err);
    }
  });

});
