'use strict';

var expect = require('expect');
var exec = require('child_process').exec;
var path = require('path');

var sliceLines = require('./tool/slice-lines');
var cmdSep = require('./tool/cmd-sep');

var gulpCmd = 'node ' + path.join(__dirname, '../bin/gulp.js');

describe('sync-task', function() {
  it('should return error code 1 if any tasks did not complete', function(done) {
    exec([
      'cd ' + path.join(__dirname, 'fixtures/gulpfiles') + cmdSep,
      gulpCmd,
      'test6 test7 test8',
    ].join(' '), cb);

    function cb(err) {
      expect(err).toNotEqual(null);
      expect(err.code).toEqual(1);
      done();
    }
  });

  it('should log tasks which did not complete', function(done) {
    exec([
      'cd ' + path.join(__dirname, 'fixtures/gulpfiles') + cmdSep,
      gulpCmd,
      'test6 test7 test8',
    ].join(' '), cb);

    function cb(err, stdout) {
      expect(sliceLines(stdout, 5, 7)).toEqual(
        'The following tasks did not complete: test7, test8\n' +
        'Did you forget to signal async completion?'
      );
      done();
    }
  });

  it('should not log false positive in case of parallel failure', function(done) {
    exec([
      'cd ' + path.join(__dirname, '..') + cmdSep,
      gulpCmd,
      '--gulpfile ./test/fixtures/gulpfiles/gulpfile-parallel-failure.js'
    ].join(' '), cb);

    function cb(err, stdout) {
      expect(stdout).toExclude('The following tasks did not complete:');
      done();
    }
  });

  it('should not log false positive in case of parallel failure in continue mode', function(done) {
    exec([
      'cd ' + path.join(__dirname, '..') + cmdSep,
      gulpCmd,
      '--continue --gulpfile ./test/fixtures/gulpfiles/gulpfile-parallel-failure.js',
    ].join(' '), cb);

    function cb(err, stdout) {
      expect(stdout).toExclude('The following tasks did not complete:');
      done();
    }
  });

  it('should log non-completing task alongside a failure in continue mode', function(done) {
    exec([
      'cd ' + path.join(__dirname, '..') + cmdSep,
      gulpCmd,
      '--continue --gulpfile ./test/fixtures/gulpfiles/gulpfile-parallel-failure.js broken',
    ].join(' '), cb);

    function cb(err, stdout) {
      expect(stdout).toInclude('The following tasks did not complete: broken, notCompleting1\n');
      done();
    }
  });
});
