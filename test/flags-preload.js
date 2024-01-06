'use strict';

var expect = require('expect');
var exec = require('child_process').exec;
var path = require('path');

var sliceLines = require('./tool/slice-lines');
var eraseTime = require('./tool/erase-time');
var eraseLapse = require('./tool/erase-lapse');
var gulp = require('./tool/gulp-cmd');

var baseDir = path.join(__dirname, '..');

describe('flag: --preload', function() {

  it('preloads module before running gulpfile', function(done) {
    var opts = { cwd: baseDir };
    exec(gulp(
      '--preload ../test-module.js',
      '--cwd ./test/fixtures/gulpfiles'
    ), opts, cb);

    function cb(err, stdout, stderr) {
      expect(err).toBeNull();
      expect(stderr).toEqual('');
      expect(sliceLines(stdout, 0, 1)).toEqual('Preloading external module: ../test-module.js');
      expect(sliceLines(stdout, 1, 2)).toEqual('inside test module');
      expect(sliceLines(stdout, 2, 3)).toEqual('Preloaded external module: ../test-module.js');

      var chgWorkdirLog = sliceLines(stdout, 3, 4);
      var workdir = 'test/fixtures/gulpfiles'.replace(/\//g, path.sep);
      expect(chgWorkdirLog).toMatch('Working directory changed to ');
      expect(chgWorkdirLog).toMatch(workdir);

      stdout = sliceLines(stdout, 5);
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

  it('can preload multiple modules before running gulpfile', function(done) {
    var opts = { cwd: baseDir };
    exec(gulp(
      '--preload ../test-module.js',
      '--preload ../test-module-2.js',
      '--cwd ./test/fixtures/gulpfiles'
    ), opts, cb);

    function cb(err, stdout, stderr) {
      expect(err).toBeNull();
      expect(stderr).toEqual('');
      expect(sliceLines(stdout, 0, 1)).toEqual('Preloading external module: ../test-module.js');
      expect(sliceLines(stdout, 1, 2)).toEqual('inside test module');
      expect(sliceLines(stdout, 2, 3)).toEqual('Preloaded external module: ../test-module.js');
      expect(sliceLines(stdout, 3, 4)).toEqual('Preloading external module: ../test-module-2.js');
      expect(sliceLines(stdout, 4, 5)).toEqual('inside test module 2');
      expect(sliceLines(stdout, 5, 6)).toEqual('Preloaded external module: ../test-module-2.js');
      done(err);
    }
  });

  it('warns if module doesn\'t exist', function(done) {
    var opts = { cwd: baseDir };
    exec(gulp(
      '--preload ./null-module.js',
      '--cwd ./test/fixtures/gulpfiles'
    ), opts, cb);

    function cb(err, stdout, stderr) {
      expect(err).toBeNull();
      expect(stderr).toEqual('');
      expect(sliceLines(stdout, 0, 2)).toEqual(
        'Preloading external module: ./null-module.js\n' +
        'Failed to preload external module: ./null-module.js'
      );
      expect(sliceLines(stdout, 2, 3)).toMatch('Error: Cannot find module \'./null-module.js\'');

      var chgWorkdirLog = sliceLines(stdout, 3, 4);
      var workdir = 'test/fixtures/gulpfiles'.replace(/\//g, path.sep);
      expect(chgWorkdirLog).toMatch('Working directory changed to ');
      expect(chgWorkdirLog).toMatch(workdir);

      expect(sliceLines(stdout, 5)).toEqual(
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
    var opts = { cwd: baseDir };
    exec(gulp(
      '--preload ../test-error-module.js',
      '--cwd ./test/fixtures/gulpfiles'
    ), opts, cb);

    function cb(err, stdout, stderr) {
      stdout = eraseLapse(eraseTime(stdout));
      expect(err).toBeNull();
      expect(stderr).toEqual('');
      expect(sliceLines(stdout, 1, 2)).toEqual('Failed to preload external module: ../test-error-module.js');
      expect(sliceLines(stdout, 2, 3)).toMatch('Error: from error module');
      expect(stdout).not.toMatch('inside error module');

      var chgWorkdirLog = sliceLines(stdout, 3, 4);
      var workdir = 'test/fixtures/gulpfiles'.replace(/\//g, path.sep);
      expect(chgWorkdirLog).toMatch('Working directory changed to ');
      expect(chgWorkdirLog).toMatch(workdir);

      expect(sliceLines(stdout, 5)).toEqual(
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
