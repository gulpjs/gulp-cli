'use strict';

var expect = require('expect');
var runner = require('gulp-test-tools').gulpRunner;
var eraseTime = require('gulp-test-tools').eraseTime;
var eraseLapse = require('gulp-test-tools').eraseLapse;
var skipLines = require('gulp-test-tools').skipLines;
var headLines = require('gulp-test-tools').headLines;
var stripAnsi = require('../lib/shared/ansi').strip;

describe('flag: --continue', function() {

  it('continues execution when flag is set', function(done) {
    runner({ verbose: false })
      .gulp('test4', '--continue', '--cwd ./test/fixtures/gulpfiles')
      .run(cb);

    function cb(err, stdout, stderr) {
      expect(err).toNotEqual(null);
      stdout = eraseLapse(eraseTime(stripAnsi(skipLines(stdout, 2))));
      expect(stdout).toEqual(
        'Starting \'test4\'...\n' +
        'Starting \'errorFunction\'...\n' +
        'Starting \'anon\'...\n' +
        'Finished \'anon\' after ?\n' +
        ''
      );

      stderr = eraseLapse(eraseTime(stripAnsi(headLines(stderr, 2))));
      expect(stripAnsi(stderr)).toEqual(
        '\'errorFunction\' errored after ?\n' +
        'Error: Error!'
      );
      done();
    }
  });

  it('stops execution when flag is not set', function(done) {
    runner({ verbose: false })
      .gulp('test4', '--cwd ./test/fixtures/gulpfiles')
      .run(cb);

    function cb(err, stdout, stderr) {
      expect(err).toNotEqual(null);
      expect(stdout).toNotMatch('Starting \'anon\'');
      stdout = eraseLapse(eraseTime(stripAnsi(skipLines(stdout, 2))));
      expect(stdout).toEqual(
        'Starting \'test4\'...\n' +
        'Starting \'errorFunction\'...\n' +
        ''
      );

      stderr = eraseLapse(eraseTime(stripAnsi(headLines(stderr, 2))));
      expect(stderr).toEqual(
        '\'errorFunction\' errored after ?\n' +
        'Error: Error!'
      );
      done();
    }
  });

});
