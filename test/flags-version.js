'use strict';

var expect = require('expect');
var exec = require('child_process').exec;
var path = require('path');
var os = require('os');

var gulp = require('./tool/gulp-cmd');
var cliVersion = require('../package.json').version;
var gulpVersion = require('gulp/package.json').version;

var baseDir = path.join(__dirname, '..');

describe('flag: --version', function() {

  it('prints the version of CLI and local gulp', function(done) {
    var opts = { cwd: baseDir };
    exec(gulp(
      '--version',
      '--cwd ./test/fixtures/gulpfiles'
    ), opts, cb);

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
    var opts = { cwd: baseDir };
    exec(gulp(
      '--version',
      '--gulpfile ./test/fixtures/gulpfiles/gulpfile-babel.babel.js'
    ), opts, cb);

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
    var opts = { cwd: baseDir };
    exec(gulp('--version', '--cwd', os.tmpdir()), opts, cb);

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
