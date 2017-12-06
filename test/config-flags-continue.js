'use strict';

var expect = require('expect');
var path = require('path');
var skipLines = require('gulp-test-tools').skipLines;
var headLines = require('gulp-test-tools').headLines;
var eraseTime = require('gulp-test-tools').eraseTime;
var eraseLapse = require('gulp-test-tools').eraseLapse;

var fixturesDir = path.join(__dirname, 'fixtures/config');
var runner = require('gulp-test-tools').gulpRunner({ verbose: false }).basedir(fixturesDir);

describe('config: flags.continue', function() {
  it('Should continue if `flags.continue` is true in .gulp.*',
  function(done) {
    runner
      .chdir('flags/continue/t')
      .gulp()
      .run(cb);

    function cb(err, stdout, stderr) {
      expect(err).toNotEqual(null);

      stdout = eraseLapse(eraseTime(skipLines(stdout, 1)));
      expect(stdout).toEqual(
        'Starting \'default\'...\n' +
        'Starting \'err\'...\n' +
        'Starting \'next\'...\n' +
        'Finished \'next\' after ?\n' +
        ''
      );
      stderr = eraseLapse(eraseTime(headLines(stderr, 2)));
      expect(stderr).toEqual(
        '\'err\' errored after ?\n' +
        'Error: Error!'
      );
      done();
    }
  });

  it('Should not continue if `flags.continue` is false in .gulp.*',
  function(done) {
    runner
      .chdir('flags/continue/f')
      .gulp()
      .run(cb);

    function cb(err, stdout, stderr) {
      expect(err).toNotEqual(null);

      stdout = eraseLapse(eraseTime(skipLines(stdout, 1)));
      expect(stdout).toEqual(
        'Starting \'default\'...\n' +
        'Starting \'err\'...\n' +
        ''
      );
      stderr = eraseLapse(eraseTime(headLines(stderr, 2)));
      expect(stderr).toEqual(
        '\'err\' errored after ?\n' +
        'Error: Error!'
      );
      done();
    }
  });
});
