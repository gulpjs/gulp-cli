'use strict';

var expect = require('expect');

var path = require('path');
var fixturesDir = path.join(__dirname, 'fixtures/config');

var headLines = require('gulp-test-tools').headLines;
var eraseTime = require('gulp-test-tools').eraseTime;
var runner = require('gulp-test-tools').gulpRunner().basedir(fixturesDir);

describe('config: flags.require', function() {

  it('Should configure with an array in a .gulp.* file', function(done) {
    runner
      .chdir('flags/require/array')
      .gulp()
      .run(cb);

    function cb(err, stdout, stderr) {
      expect(err).toEqual(null);
      expect(stderr).toEqual('');

      var requiring1 = eraseTime(headLines(stdout, 1));
      expect(requiring1).toEqual('Requiring external module ./preload_one');
      var requiring2 = eraseTime(headLines(stdout, 1, 1));
      expect(requiring2).toEqual('Requiring external module ./preload_two');
      var preload1 = eraseTime(headLines(stdout, 1, 4));
      expect(preload1).toEqual('preload one!');
      var preload2 = eraseTime(headLines(stdout, 1, 5));
      expect(preload2).toEqual('preload two!');
      done(err);
    }
  });

  it('Should configure with a string in a .gulp.* file', function(done) {
    runner
      .chdir('flags/require/string')
      .gulp()
      .run(cb);

    function cb(err, stdout, stderr) {
      expect(err).toEqual(null);
      expect(stderr).toEqual('');
      var requiring = eraseTime(headLines(stdout, 1));
      expect(requiring).toEqual('Requiring external module ./preload');
      var preload1 = eraseTime(headLines(stdout, 1, 3));
      expect(preload1).toEqual('hello preload!');
      done(err);
    }
  });

  it('Combines --require flag with .gulp.* file flags.require', function(done) {
    runner
      .chdir('flags/require/join-flags')
      .gulp('--require ./preload_one')
      .run(cb);

    function cb(err, stdout, stderr) {
      expect(err).toEqual(null);
      expect(stderr).toEqual('');

      var requiring1 = eraseTime(headLines(stdout, 1));
      expect(requiring1).toEqual('Requiring external module ./preload_one');
      var requiring2 = eraseTime(headLines(stdout, 1, 1));
      expect(requiring2).toEqual('Requiring external module ./preload_two');
      var preload1 = eraseTime(headLines(stdout, 1, 4));
      expect(preload1).toEqual('preload one!');
      var preload2 = eraseTime(headLines(stdout, 1, 5));
      expect(preload2).toEqual('preload two!');
      done(err);
    }
  });

  it.skip('missing test for cwd', function(done) {
    runner
      .gulp('--cwd flags --gulpfile flags/require/array/gulpfile.js')
      .run(cb);

    function cb(err, stdout, stderr) {
      expect(err).toEqual(null);
      expect(stderr).toEqual('');
      expect(eraseTime(stdout)).toEqual(
        'Requiring external module ./preload_one\n' +
        'Requiring external module ./preload_two\n' +
        'preload one!\n' +
        'preload two!\n' +
      '');
      done(err);
    }
  });
});

