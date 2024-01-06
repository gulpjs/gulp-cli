'use strict';

var expect = require('expect');
var exec = require('child_process').exec;
var path = require('path');

var sliceLines = require('./tool/slice-lines');
var gulp = require('./tool/gulp-cmd');

var baseDir = path.join(__dirname, 'fixtures/config/flags/continue');

describe('config: flags.continue', function() {

  it('Should continue if `flags.continue` is true in .gulp.*', function(done) {
    var opts = { cwd: path.join(baseDir, 't') };
    exec(gulp(), opts, cb);

    function cb(err, stdout, stderr) {
      expect(err).not.toBeNull();
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
    var opts = { cwd: path.join(baseDir, 'f') };
    exec(gulp(), opts, cb);

    function cb(err, stdout, stderr) {
      expect(err).not.toBeNull();
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
    var opts = { cwd: path.join(baseDir, 'f') };
    exec(gulp('--continue'), opts, cb);

    function cb(err, stdout, stderr) {
      expect(err).not.toBeNull();
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
    var opts = { cwd: path.join(baseDir, 't') };
    exec(gulp('--no-continue'), opts, cb);

    function cb(err, stdout, stderr) {
      expect(err).not.toBeNull();
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
