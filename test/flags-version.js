'use strict';

var expect = require('expect');
var exec = require('child_process').exec;
var path = require('path');
var os = require('os');

var cmdSep = require('./tool/cmd-sep');

var cliVersion = require('../package.json').version;
var gulpVersion = require('gulp/package.json').version;

var gulpCmd = 'node ' + path.join(__dirname, '../bin/gulp.js');
var baseDir = path.join(__dirname, '..');

describe('flag: --version', function() {

  it('prints the version of CLI and local gulp', function(done) {
    exec([
      'cd ' + baseDir + cmdSep,
      gulpCmd,
      '--version --cwd ./test/fixtures/gulpfiles',
    ].join(' '), cb);

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
    exec([
      'cd ' + baseDir + cmdSep,
      gulpCmd,
      '--version --gulpfile ./test/fixtures/gulpfiles/gulpfile-babel.babel.js',
    ].join(' '), cb);

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
    exec([
      'cd ' + baseDir + cmdSep,
      gulpCmd,
      '--version', '--cwd', os.tmpdir(),
    ].join(' '), cb);

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
