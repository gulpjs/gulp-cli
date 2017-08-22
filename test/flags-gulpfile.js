'use strict';

var expect = require('expect');
var runner = require('gulp-test-tools').gulpRunner;
var skipLines = require('gulp-test-tools').skipLines;
var headLines = require('gulp-test-tools').headLines;
var eraseTime = require('gulp-test-tools').eraseTime;
var eraseLapse = require('gulp-test-tools').eraseLapse;
var path = require('path');
var stripAnsi = require('./shared/stripAnsi');

describe('flag: --gulpfile', function() {

  it('Manually set path of gulpfile', function(done) {
    var gulpfilePath = 'test/fixtures/gulpfiles/gulpfile-2.js';

    runner({ verbose: false })
      .gulp('--gulpfile', gulpfilePath)
      .run(cb);

    function cb(err, stdout, stderr) {
      expect(err).toEqual(null);
      expect(stderr).toEqual('');

      var chgWorkdirLog = headLines(stdout, 1);
      var workdir = path.dirname(gulpfilePath).replace(/\//g, path.sep);
      expect(chgWorkdirLog).toMatch('Working directory changed to ');
      expect(chgWorkdirLog).toMatch(workdir);
      stdout = eraseLapse(eraseTime(stripAnsi(skipLines(stdout, 2))));
      expect(stdout).toEqual(
        'Starting \'default\'...\n' +
        'Starting \'logGulpfilePath\'...\n' +
        path.resolve(gulpfilePath) + '\n' +
        'Finished \'logGulpfilePath\' after ?\n' +
        'Finished \'default\' after ?\n' +
        ''
      );
      done(err);
    }
  });

});
