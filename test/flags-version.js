'use strict';

var lab = exports.lab = require('lab').script();
var expect = require('code').expect;
var runner = require('gulp-test-tools').gulpRunner;
var eraseTime = require('gulp-test-tools').eraseTime;

var cliVersion = require('../package.json').version;
var gulpVersion = require('gulp/package.json').version;

lab.experiment('flag: --version', function() {

  lab.test('prints the version of CLI and local gulp', function(done) {
    runner({ verbose: false })
      .gulp('--version --cwd ./test/fixtures/gulpfiles')
      .run(cb);

    function cb(err, stdout) {
      stdout = eraseTime(stdout);
      expect(stdout).to.equal(
        'CLI version ' + cliVersion + '\n' +
        'Local version ' + gulpVersion + '\n' +
        ''
      );
      done(err);
    }
  });

});
