'use strict';

var expect = require('expect');
var exec = require('child_process').exec;
var path = require('path');

var eraseTime = require('./tool/erase-time');
var cmdSep = require('./tool/cmd-sep');

var baseDir = path.join(__dirname, '..');
var gulpCmd = 'node ' + path.join(__dirname, '../bin/gulp.js');

describe('flag: --verify', function() {

  it('dependencies with invalid dependency', function(done) {
    exec([
      'cd ' + baseDir + cmdSep,
      gulpCmd,
      '--verify invalid-package.json',
      '--cwd ./test/fixtures/verify/',
    ].join(' '), cb);

    function cb(err, stdout, stderr) {
      expect(err).not.toBeNull();
      expect(stderr).toEqual('');
      expect(eraseTime(stdout)).toEqual(
        'Verifying plugins in ' + path.resolve('./test/fixtures/verify/invalid-package.json') + '\n' +
        'Blacklisted plugins found in this project:\n' +
        'gulp-blink: deprecated. use `blink` instead.\n' +
        ''
      );
      done();
    }
  });

  it('dependencies with valid dependency', function(done) {
    exec([
      'cd ' + baseDir + cmdSep,
      gulpCmd,
      '--verify valid-package.json', '--cwd ./test/fixtures/verify/',
    ].join(' '), cb);

    function cb(err, stdout, stderr) {
      expect(err).toBeNull();
      expect(stderr).toEqual('');
      expect(eraseTime(stdout)).toEqual(
        'Verifying plugins in ' + path.resolve('./test/fixtures/verify/valid-package.json') + '\n' +
        'There are no blacklisted plugins in this project\n' +
        ''
      );
      done(err);
    }
  });

  it('default args with invalid dependency', function(done) {
    exec([
      'cd ' + baseDir + cmdSep,
      gulpCmd,
      '--verify', '--cwd', path.resolve('./test/fixtures/verify/'),
    ].join(' '), cb);

    function cb(err, stdout, stderr) {
      expect(err).not.toBeNull();
      expect(stderr).toEqual('');
      expect(eraseTime(stdout)).toEqual(
        'Verifying plugins in ' + path.resolve('./test/fixtures/verify/package.json') + '\n' +
        'Blacklisted plugins found in this project:\n' +
        'gulp-blink: deprecated. use `blink` instead.\n' +
        ''
      );
      done();
    }
  });

});
