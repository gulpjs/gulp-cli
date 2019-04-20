'use strict';

var expect = require('expect');
var runner = require('gulp-test-tools').gulpRunner;
var os = require('os');

var cliVersion = require('../package.json').version;
var gulpVersion = require('gulp/package.json').version;

describe('flag: --version', function() {

  it('prints the version of CLI and local gulp', function(done) {
    runner({ verbose: false })
      .gulp('--version --cwd ./test/fixtures/gulpfiles')
      .run(cb);

    function cb(err, stdout, stderr) {
      expect(err).toEqual(null);
      expect(stderr).toEqual('');
      expect(stdout).toEqual(
        'CLI version: ' + cliVersion + '\n' +
        'Local version: ' + gulpVersion + '\n' +
        ''
      );
      done(err);
    }
  });

  it('avoids printing "Requiring external module *"', function(done) {
    runner({ verbose: false })
      .gulp('--version --gulpfile ./test/fixtures/gulpfiles/gulpfile-babel.babel.js')
      .run(cb);

    function cb(err, stdout, stderr) {
      expect(err).toEqual(null);
      expect(stderr).toEqual('');
      expect(stdout).toEqual(
        'CLI version: ' + cliVersion + '\n' +
        'Local version: ' + gulpVersion + '\n' +
        ''
      );
      done(err);
    }
  });

  it('should print only CLI version when gulp is not found', function(done) {
    runner({ verbose: false })
      .gulp('--version', '--cwd', os.tmpdir())
      .run(cb);

    function cb(err, stdout, stderr) {
      expect(err).toEqual(null);
      expect(stderr).toEqual('');
      expect(stdout).toEqual(
        'CLI version: ' + cliVersion + '\n' +
        'Local version: Unknown\n'
      );
      done(err);
    }
  });

});
