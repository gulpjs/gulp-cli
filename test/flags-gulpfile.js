'use strict';

var lab = exports.lab = require('lab').script();
var expect = require('code').expect;
var runner = require('gulp-test-tools').gulpRunner;
var skipLines = require('gulp-test-tools').skipLines;
var headLines = require('gulp-test-tools').headLines;
var eraseTime = require('gulp-test-tools').eraseTime;
var eraseLapse = require('gulp-test-tools').eraseLapse;
var path = require('path');

lab.experiment('flag: --gulpfile', function() {

  lab.test('Manually set path of gulpfile', function(done) {
    var gulpfilePath = 'test/fixtures/gulpfiles/gulpfile-2.js';

    runner({ verbose: false })
      .gulp('--gulpfile', gulpfilePath)
      .run(cb);

    function cb(err, stdout) {
      var chgWorkdirLog = headLines(stdout, 1);
      var workdir = path.dirname(gulpfilePath).replace(/\//g, path.sep);
      expect(chgWorkdirLog).to.contain('Working directory changed to ');
      expect(chgWorkdirLog).to.contain(workdir);

      stdout = eraseLapse(eraseTime(skipLines(stdout, 2)));
      expect(stdout).to.equal(
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
