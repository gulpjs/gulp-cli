'use strict';

var expect = require('expect');
var runner = require('gulp-test-tools').gulpRunner;
var eraseTime = require('gulp-test-tools').eraseTime;
var path = require('path');

describe('flag: --verify', function() {
  it('dependencies with invalid dependency', function(done) {
    runner({ verbose: false })
      .gulp('--verify invalid-package.json', '--cwd ./test/fixtures/packages/')
      .run(cb);

    function cb(err, stdout, stderr) {
      expect(err).toNotEqual(null);
      expect(stderr).toEqual('');
      stdout = eraseTime(stdout);
      expect(stdout).toEqual(
        'Verifying plugins in ' +
          path.resolve('./test/fixtures/packages/invalid-package.json') +
          '\n' +
          'Blacklisted plugins found in this project:\n' +
          'gulp-blink: deprecated. use `blink` instead.\n' +
          ''
      );
      done();
    }
  });

  it('dependencies with valid dependency', function(done) {
    runner({ verbose: false })
      .gulp('--verify valid-package.json', '--cwd ./test/fixtures/packages/')
      .run(cb);

    function cb(err, stdout, stderr) {
      expect(err).toEqual(null);
      expect(stderr).toEqual('');
      stdout = eraseTime(stdout);
      expect(stdout).toEqual(
        'Verifying plugins in ' +
          path.resolve('./test/fixtures/packages/valid-package.json') +
          '\n' +
          'There are no blacklisted plugins in this project\n' +
          ''
      );
      done(err);
    }
  });

  it('default args with invalid dependency', function(done) {
    runner({ verbose: false })
      .gulp('--verify', '--cwd ./test/fixtures/packages/')
      .run(cb);

    function cb(err, stdout, stderr) {
      expect(err).toNotEqual(null);
      expect(stderr).toEqual('');
      stdout = eraseTime(stdout);
      expect(stdout).toEqual(
        'Verifying plugins in ' +
          path.resolve('./test/fixtures/packages/package.json') +
          '\n' +
          'Blacklisted plugins found in this project:\n' +
          'gulp-blink: deprecated. use `blink` instead.\n' +
          ''
      );
      done();
    }
  });
});
