'use strict';

var expect = require('expect');
var runner = require('gulp-test-tools').gulpRunner;
var eraseTime = require('gulp-test-tools').eraseTime;
var eraseLapse = require('gulp-test-tools').eraseLapse;
var skipLines = require('gulp-test-tools').skipLines;

describe('flag: --series', function() {

  it('runs tasks in series when flag is set', function(done) {
    runner({ verbose: false })
      .gulp('test5 test6', '--series', '--cwd ./test/fixtures/gulpfiles')
      .run(cb);

    function cb(err, stdout, stderr) {
      expect(err).toEqual(null);
      expect(stderr).toEqual('');
      stdout = eraseLapse(eraseTime(skipLines(stdout, 2)));
      expect(stdout).toEqual(
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
    runner({ verbose: false })
      .gulp('test5 test6', '--cwd ./test/fixtures/gulpfiles')
      .run(cb);

    function cb(err, stdout, stderr) {
      expect(err).toEqual(null);
      expect(stderr).toEqual('');
      expect(stdout).toNotMatch('Starting \'anon\'');
      stdout = eraseLapse(eraseTime(skipLines(stdout, 2)));
      expect(stdout).toEqual(
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
