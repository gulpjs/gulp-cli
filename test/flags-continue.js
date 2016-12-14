'use strict';

var lab = exports.lab = require('lab').script();
var expect = require('code').expect;
var runner = require('gulp-test-tools').gulpRunner;
var eraseTime = require('gulp-test-tools').eraseTime;
var eraseLapse = require('gulp-test-tools').eraseLapse;
var skipLines = require('gulp-test-tools').skipLines;
var headLines = require('gulp-test-tools').headLines;

lab.experiment('flag: --continue', function() {

  lab.test('continues execution when flag is set', function(done) {
    runner({ verbose: false })
      .gulp('test4', '--continue', '--cwd ./test/fixtures/gulpfiles')
      .run(cb);

    function cb(err, stdout, stderr) {
      expect(err).to.be.not.null();

      stdout = eraseLapse(eraseTime(skipLines(stdout, 2)));
      expect(stdout).to.equal(
        'Starting \'test4\'...\n' +
        'Starting \'errorFunction\'...\n' +
        'Starting \'anon\'...\n' +
        'Finished \'anon\' after ?\n' +
        ''
      );

      stderr = eraseLapse(eraseTime(headLines(stderr, 2)));
      expect(stderr).to.equal(
        '\'errorFunction\' errored after ?\n' +
        'Error: Error!'
      );
      done();
    }
  });

  lab.test('stops execution when flag is not set', function(done) {
    runner({ verbose: false })
      .gulp('test4', '--cwd ./test/fixtures/gulpfiles')
      .run(cb);

    function cb(err, stdout, stderr) {
      expect(err).to.be.not.null();

      expect(stdout).to.not.contain('Starting \'anon\'');
      stdout = eraseLapse(eraseTime(skipLines(stdout, 2)));
      expect(stdout).to.equal(
        'Starting \'test4\'...\n' +
        'Starting \'errorFunction\'...\n' +
        ''
      );

      stderr = eraseLapse(eraseTime(headLines(stderr, 2)));
      expect(stderr).to.equal(
        '\'errorFunction\' errored after ?\n' +
        'Error: Error!'
      );
      done();
    }
  });

});
