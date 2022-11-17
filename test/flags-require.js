'use strict';

var expect = require('expect');
var exec = require('child_process').exec;
var path = require('path');

var sliceLines = require('./tool/slice-lines');
var eraseTime = require('./tool/erase-time');
var eraseLapse = require('./tool/erase-lapse');
var cmdSep = require('./tool/cmd-sep');

var gulpCmd = 'node ' + path.join(__dirname, '../bin/gulp.js');
var baseDir = path.join(__dirname, '..');

describe('flag: --require', function() {

  it('requires module before running gulpfile', function(done) {
    exec([
      'cd ' + baseDir + cmdSep,
      gulpCmd,
      '--require ../test-module.js',
      '--cwd ./test/fixtures/gulpfiles'
    ].join(' '), cb);

    function cb(err, stdout, stderr) {
      expect(err).toEqual(null);
      expect(stderr).toEqual('');
      expect(sliceLines(stdout, 0, 1)).toEqual('inside test module');
      expect(sliceLines(stdout, 1, 2)).toEqual('Requiring external module ../test-module.js');

      var chgWorkdirLog = sliceLines(stdout, 2, 3);
      var workdir = 'test/fixtures/gulpfiles'.replace(/\//g, path.sep);
      expect(chgWorkdirLog).toMatch('Working directory changed to ');
      expect(chgWorkdirLog).toMatch(workdir);

      stdout = sliceLines(stdout, 4);
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
    exec([
      'cd ' + baseDir + cmdSep,
      gulpCmd,
      '--require ../test-module.js',
      '--require ../test-module-2.js',
      '--cwd ./test/fixtures/gulpfiles',
    ].join(' '), cb);

    function cb(err, stdout, stderr) {
      expect(err).toEqual(null);
      expect(stderr).toEqual('');
      expect(sliceLines(stdout, 0, 1)).toEqual('inside test module');
      expect(sliceLines(stdout, 1, 2)).toEqual('Requiring external module ../test-module.js');
      expect(sliceLines(stdout, 2, 3)).toEqual('inside test module 2');
      expect(sliceLines(stdout, 3, 4)).toEqual('Requiring external module ../test-module-2.js');
      done(err);
    }
  });

  it('warns if module doesn\'t exist', function(done) {
    exec([
      'cd ' + baseDir + cmdSep,
      gulpCmd,
      '--require ./null-module.js',
      '--cwd ./test/fixtures/gulpfiles',
    ].join(' '), cb);

    function cb(err, stdout, stderr) {
      expect(err).toEqual(null);
      expect(stderr).toEqual('');
      stdout = eraseLapse(eraseTime(stdout));
      expect(stdout).toMatch('Failed to load external module ./null-module.js');
      expect(stdout).toMatch('Error: Cannot find module \'./null-module.js\'');
      expect(stdout).toNotMatch('inside test module');
      expect(stdout).toNotMatch('Requiring external module ../test-module.js');

      var chgWorkdirLog = sliceLines(stdout, 0, 3);
      var workdir = 'test/fixtures/gulpfiles'.replace(/\//g, path.sep);
      expect(chgWorkdirLog).toMatch('Working directory changed to ');
      expect(chgWorkdirLog).toMatch(workdir);

      expect(sliceLines(stdout, 4)).toEqual(
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
    exec([
      'cd ' + baseDir + cmdSep,
      gulpCmd,
      '--require ../test-error-module.js',
      '--cwd ./test/fixtures/gulpfiles',
    ].join(' '), cb);

    function cb(err, stdout, stderr) {
      stdout = eraseLapse(eraseTime(stdout));
      expect(err).toEqual(null);
      expect(stderr).toEqual('');
      expect(stdout).toMatch('Failed to load external module ../test-error-module.js');
      expect(stdout).toMatch('Error: from error module');
      expect(stdout).toNotMatch('inside error module');

      var chgWorkdirLog = sliceLines(stdout, 0, 3);
      var workdir = 'test/fixtures/gulpfiles'.replace(/\//g, path.sep);
      expect(chgWorkdirLog).toMatch('Working directory changed to ');
      expect(chgWorkdirLog).toMatch(workdir);

      expect(sliceLines(stdout, 4)).toEqual(
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
