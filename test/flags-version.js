'use strict';

var expect = require('expect');
var runner = require('gulp-test-tools').gulpRunner;
var eraseTime = require('gulp-test-tools').eraseTime;

var cliVersion = require('../package.json').version;
var gulpVersion = require('gulp/package.json').version;

describe('flag: --version', function() {

  it('prints the version of CLI and local gulp', function(done) {
    runner({ verbose: false })
      .gulp('--version --cwd ./test/fixtures/gulpfiles')
      .run(cb);

    function cb(err, stdout, stderr) {
      expect(stderr).toEqual('');
      stdout = eraseTime(stdout);
      expect(stdout).toEqual(
        'CLI version ' + cliVersion + '\n' +
        'Local version ' + gulpVersion + '\n' +
        ''
      );
      done(err);
    }
  });

});
