'use strict';

var expect = require('expect');
var exec = require('child_process').exec;
var path = require('path');

var sliceLines = require('./tool/slice-lines');
var cmdSep = require('./tool/cmd-sep');

var gulpCmd = 'node ' + path.join(__dirname, '../bin/gulp.js');
var baseDir = path.join(__dirname, 'fixtures/config/flags/continue');

describe('config: flags.continue', function() {

  it('Should continue if `flags.continue` is true in .gulp.*', function(done) {
    exec([
      'cd ' + path.join(baseDir, 't') + cmdSep,
      gulpCmd,
    ].join(' '), cb);

    function cb(err, stdout, stderr) {
      expect(err).toNotEqual(null);
      stdout = sliceLines(stdout, 1);
      expect(stdout).toEqual(
        'Starting \'default\'...\n' +
        'Starting \'err\'...\n' +
        'Starting \'next\'...\n' +
        'Finished \'next\' after ?\n' +
        ''
      );
      stderr = sliceLines(stderr, 0, 2);
      expect(stderr).toEqual(
        '\'err\' errored after ?\n' +
        'Error: Error!'
      );
      done();
    }
  });

  it('Should not continue if `flags.continue` is false in .gulp.*', function(done) {
    exec([
      'cd ' + path.join(baseDir, 'f') + cmdSep,
      gulpCmd,
    ].join(' '), cb);

    function cb(err, stdout, stderr) {
      expect(err).toNotEqual(null);
      stdout = sliceLines(stdout, 1);
      expect(stdout).toEqual(
        'Starting \'default\'...\n' +
        'Starting \'err\'...\n' +
        ''
      );
      stderr = sliceLines(stderr, 0, 2);
      expect(stderr).toEqual(
        '\'err\' errored after ?\n' +
        'Error: Error!'
      );
      done();
    }
  });

  it('Should overridden by cli flag: --continue', function(done) {
    exec([
      'cd ' + path.join(baseDir, 'f') + cmdSep,
      gulpCmd,
      '--continue',
    ].join(' '), cb);

    function cb(err, stdout, stderr) {
      expect(err).toNotEqual(null);
      stdout = sliceLines(stdout, 1);
      expect(stdout).toEqual(
        'Starting \'default\'...\n' +
        'Starting \'err\'...\n' +
        'Starting \'next\'...\n' +
        'Finished \'next\' after ?\n' +
        ''
      );
      stderr = sliceLines(stderr, 0, 2);
      expect(stderr).toEqual(
        '\'err\' errored after ?\n' +
        'Error: Error!'
      );
      done();
    }
  });

  it('Should overridden by cli flag: --no-continue', function(done) {
    exec([
      'cd ' + path.join(baseDir, 't') + cmdSep,
      gulpCmd,
      '--no-continue',
    ].join(' '), cb);

    function cb(err, stdout, stderr) {
      expect(err).toNotEqual(null);
      stdout = sliceLines(stdout, 1);
      expect(stdout).toEqual(
        'Starting \'default\'...\n' +
        'Starting \'err\'...\n' +
        ''
      );
      stderr = sliceLines(stderr, 0, 2);
      expect(stderr).toEqual(
        '\'err\' errored after ?\n' +
        'Error: Error!'
      );
      done();
    }
  });

});
