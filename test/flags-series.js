'use strict';

var expect = require('expect');
var exec = require('child_process').exec;
var path = require('path');

var sliceLines = require('./tool/slice-lines');
var gulp = require('./tool/gulp-cmd');

var baseDir = path.join(__dirname, '..');

describe('flag: --series', function() {

  it('runs tasks in series when flag is set', function(done) {
    var opts = { cwd: baseDir };
    exec(gulp(
      'test5 test6',
      '--series',
      '--cwd ./test/fixtures/gulpfiles'
    ), opts, cb);

    function cb(err, stdout, stderr) {
      expect(err).toBeNull();
      expect(stderr).toEqual('');
      expect(sliceLines(stdout, 2)).toEqual(
        'Starting \'test5\'...\n' +
        'Finished \'test5\' after ?\n' +
        'Starting \'test6\'...\n' +
        'Finished \'test6\' after ?\n' +
        ''
      );
      done();
    }
  });

  it('runs tasks in parallel when flag is not set', function(done) {
    var opts = { cwd: baseDir };
    exec(gulp(
      'test5 test6',
      '--cwd ./test/fixtures/gulpfiles'
    ), opts, cb);

    function cb(err, stdout, stderr) {
      expect(err).toBeNull();
      expect(stderr).toEqual('');
      expect(stdout).not.toMatch('Starting \'anon\'');
      expect(sliceLines(stdout, 2)).toEqual(
        'Starting \'test5\'...\n' +
        'Starting \'test6\'...\n' +
        'Finished \'test6\' after ?\n' +
        'Finished \'test5\' after ?\n' +
        ''
      );
      done();
    }
  });

});
