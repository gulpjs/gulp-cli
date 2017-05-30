'use strict';

var expect = require('expect');
var path = require('path');
var skipLines = require('gulp-test-tools').skipLines;
var eraseTime = require('gulp-test-tools').eraseTime;
var eraseLapse = require('gulp-test-tools').eraseLapse;

var fixturesDir = path.join(__dirname, 'fixtures/config');
var runner = require('gulp-test-tools').gulpRunner().basedir(fixturesDir);

describe('config: flags.silent', function() {

  it('Should be silent if `flags.silent` is true in .gulp.*',
  function(done) {
    runner
      .chdir('flags/silent/t')
      .gulp()
      .run(cb);

    function cb(err, stdout, stderr) {
      expect(err).toEqual(null);
      expect(stderr).toEqual('');
      expect(stdout).toEqual('');
      done(err);
    }
  });

  it('Should not be silent if `flags.silent` is false in .gulp.*',
  function(done) {
    runner
      .chdir('flags/silent/f')
      .gulp()
      .run(cb);

    function cb(err, stdout, stderr) {
      expect(err).toEqual(null);
      expect(stderr).toEqual('');
      stdout = eraseLapse(eraseTime(skipLines(stdout, 1)));
      expect(stdout).toEqual(
        'Starting \'default\'...\n' +
        'Finished \'default\' after ?\n' +
        ''
      );
      done(err);
    }
  });

});
