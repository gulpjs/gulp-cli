'use strict';

var expect = require('expect');
var exec = require('child_process').exec;
var path = require('path');

var sliceLines = require('./tool/slice-lines');
var gulp = require('./tool/gulp-cmd');

describe('sync-task', function() {
  it('should return error code 1 if any tasks did not complete', function(done) {
    var opts = { cwd: path.join(__dirname, 'fixtures/gulpfiles') };
    exec(gulp('test6 test7 test8'), opts, cb);

    function cb(err) {
      expect(err).not.toBeNull();
      expect(err.code).toEqual(1);
      done();
    }
  });

  it('should log tasks which did not complete', function(done) {
    var opts = { cwd: path.join(__dirname, 'fixtures/gulpfiles') };
    exec(gulp('test6 test7 test8'), opts, cb);

    function cb(err, stdout) {
      expect(sliceLines(stdout, 5, 7)).toEqual(
        'The following tasks did not complete: test7, test8\n' +
        'Did you forget to signal async completion?'
      );
      done();
    }
  });

  it('should not log false positive in case of parallel failure', function(done) {
    var opts = { cwd: path.join(__dirname, '..') };
    exec(gulp(
      '--gulpfile ./test/fixtures/gulpfiles/gulpfile-parallel-failure.js'
    ), opts, cb);

    function cb(err, stdout) {
      expect(stdout).not.toMatch('The following tasks did not complete:');
      done();
    }
  });

  it('should not log false positive in case of parallel failure in continue mode', function(done) {
    var opts = { cwd: path.join(__dirname, '..') };
    exec(gulp(
      '--gulpfile ./test/fixtures/gulpfiles/gulpfile-parallel-failure.js'
    ), opts, cb);

    function cb(err, stdout) {
      expect(stdout).not.toMatch('The following tasks did not complete:');
      done();
    }
  });

  it('should log non-completing task alongside a failure in continue mode', function(done) {
    var opts = { cwd: path.join(__dirname, '..') };
    exec(gulp(
      '--continue',
      '--gulpfile ./test/fixtures/gulpfiles/gulpfile-parallel-failure.js',
      'broken'
    ), opts, cb);

    function cb(err, stdout) {
      expect(stdout).toMatch('The following tasks did not complete: broken, notCompleting1\n');
      done();
    }
  });
});
