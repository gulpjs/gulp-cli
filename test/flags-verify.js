'use strict';

var lab = exports.lab = require('lab').script();
var expect = require('code').expect;
var runner = require('gulp-test-tools').gulpRunner;
var eraseTime = require('gulp-test-tools').eraseTime;
var path = require('path');

lab.experiment('flag: --verify', function() {

  lab.test('dependencies with invalid dependency', function(done) {
    runner({ verbose: false })
      .gulp('--verify invalid-package.json', '--cwd ./test/fixtures/packages/')
      .run(cb);

    function cb(err, stdout) {
      expect(err).to.be.not.null;

      stdout = eraseTime(stdout);
      expect(stdout).to.equal(
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

  lab.test('dependencies with valid dependency', function(done) {
    runner({ verbose: false })
      .gulp('--verify valid-package.json', '--cwd ./test/fixtures/packages/')
      .run(cb);

    function cb(err, stdout) {
      stdout = eraseTime(stdout);
      expect(stdout).to.equal(
        'Verifying plugins in ' +
          path.resolve('./test/fixtures/packages/valid-package.json') +
          '\n' +
        'There are no blacklisted plugins in this project\n' +
        ''
      );
      done(err);
    }
  });

  lab.test('default args with invalid dependency', function(done) {
    runner({ verbose: false })
      .gulp('--verify', '--cwd ./test/fixtures/packages/')
      .run(cb);

    function cb(err, stdout) {
      expect(err).to.be.not.null;

      stdout = eraseTime(stdout);
      expect(stdout).to.equal(
        'Verifying plugins in ' +
          path.resolve('./test/fixtures/packages/package.json') + '\n' +
        'Blacklisted plugins found in this project:\n' +
        'gulp-blink: deprecated. use `blink` instead.\n' +
        ''
      );
      done();
    }
  });

});
