'use strict';

var expect = require('expect');
var exec = require('child_process').exec;
var path = require('path');
var os = require('os');

var cd = require('./tool/gulp-cmd').cd;
var cliVersion = require('../package.json').version;
var gulpVersion = require('gulp/package.json').version;

var baseDir = path.join(__dirname, '..');

describe('flag: --version', function() {

  it('prints the version of CLI and local gulp', function(done) {
    exec(cd(baseDir).gulp(
      '--version',
      '--cwd ./test/fixtures/gulpfiles'
    ), cb);

    function cb(err, stdout, stderr) {
      expect(err).toBeNull();
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
    exec(cd(baseDir).gulp(
      '--version',
      '--gulpfile ./test/fixtures/gulpfiles/gulpfile-babel.babel.js'
    ), cb);

    function cb(err, stdout, stderr) {
      expect(err).toBeNull();
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
    exec(cd(baseDir).gulp('--version', '--cwd', os.tmpdir()), cb);

    function cb(err, stdout, stderr) {
      expect(err).toBeNull();
      expect(stderr).toEqual('');
      expect(stdout).toEqual(
        'CLI version: ' + cliVersion + '\n' +
        'Local version: Unknown\n'
      );
      done(err);
    }
  });

});
