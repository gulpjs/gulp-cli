'use strict';

var expect = require('expect');
var exec = require('child_process').exec;
var path = require('path');

var sliceLines = require('./tool/slice-lines');
var gulp = require('./tool/gulp-cmd');

var baseDir = path.join(__dirname, 'fixtures/config/flags/series');

describe('config: flags.series', function() {

  it('Should run in series if `flags.series` is true in .gulp.*', function(done) {
    var opts = { cwd: path.join(baseDir, 't') };
    exec(gulp('task1', 'task2'), opts, cb);

    function cb(err, stdout, stderr) {
      expect(err).toBeNull();
      expect(stderr).toEqual('');
      expect(sliceLines(stdout, 1)).toEqual(
        'Starting \'task1\'...\n' +
        'Finished \'task1\' after ?\n' +
        'Starting \'task2\'...\n' +
        'Finished \'task2\' after ?\n' +
        ''
      );
      done();
    }
  });

  it('Should run in parallel if `flags.series` is false in .gulp.*', function(done) {
    var opts = { cwd: path.join(baseDir, 'f') };
    exec(gulp('task1', 'task2'), opts, cb);

    function cb(err, stdout, stderr) {
      expect(err).toBeNull();
      expect(stderr).toEqual('');
      expect(sliceLines(stdout, 1)).toEqual(
        'Starting \'task1\'...\n' +
        'Starting \'task2\'...\n' +
        'Finished \'task2\' after ?\n' +
        'Finished \'task1\' after ?\n' +
        ''
      );
      done();
    }
  });

  it('Should overridden by cli flag: --series', function(done) {
    var opts = { cwd: path.join(baseDir, 'f') };
    exec(gulp('--series', 'task1', 'task2'), opts, cb);

    function cb(err, stdout, stderr) {
      expect(err).toBeNull();
      expect(stderr).toEqual('');
      expect(sliceLines(stdout, 1)).toEqual(
        'Starting \'task1\'...\n' +
        'Finished \'task1\' after ?\n' +
        'Starting \'task2\'...\n' +
        'Finished \'task2\' after ?\n' +
        ''
      );
      done();
    }
  });

  it('Should overridden by cli flag: --no-series', function(done) {
    var opts = { cwd: path.join(baseDir, 't') };
    exec(gulp('--no-series', 'task1', 'task2'), opts, cb);

    function cb(err, stdout, stderr) {
      expect(err).toBeNull();
      expect(stderr).toEqual('');
      expect(sliceLines(stdout, 1)).toEqual(
        'Starting \'task1\'...\n' +
        'Starting \'task2\'...\n' +
        'Finished \'task2\' after ?\n' +
        'Finished \'task1\' after ?\n' +
        ''
      );
      done();
    }
  });
});
