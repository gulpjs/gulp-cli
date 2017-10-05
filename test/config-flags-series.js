'use strict';

var expect = require('expect');
var path = require('path');

var skipLines = require('gulp-test-tools').skipLines;
var eraseTime = require('gulp-test-tools').eraseTime;
var eraseLapse = require('gulp-test-tools').eraseLapse;
var runner = require('gulp-test-tools').gulpRunner;

var fixturesDir = path.join(__dirname, 'fixtures/config');
var runner = require('gulp-test-tools').gulpRunner({ verbose: false }).basedir(fixturesDir);

describe('config: flags.series', function() {

  it('Should run in series if `flags.series` is true in .gulp.*',
    function(done) {
      runner
        .chdir('flags/series/t')
        .gulp('task1 task2')
        .run(cb);

      function cb(err, stdout, stderr) {
        expect(err).toEqual(null);
        expect(stderr).toEqual('');

        stdout = eraseLapse(eraseTime(skipLines(stdout, 1)));
        expect(stdout).toEqual(
          'Starting \'task1\'...\n' +
          'Finished \'task1\' after ?\n' +
          'Starting \'task2\'...\n' +
          'Finished \'task2\' after ?\n' +
          ''
        );
        done();
      }
    });

  it('Should run in parallel if `flags.series` is false in .gulp.*',
    function(done) {
      runner
        .chdir('flags/series/f')
        .gulp('task1 task2')
        .run(cb);

      function cb(err, stdout, stderr) {
        expect(err).toEqual(null);
        expect(stderr).toEqual('');

        stdout = eraseLapse(eraseTime(skipLines(stdout, 1)));
        expect(stdout).toEqual(
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
