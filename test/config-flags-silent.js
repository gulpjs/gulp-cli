'use strict';

var expect = require('expect');
var exec = require('child_process').exec;
var path = require('path');

var sliceLines = require('./tool/slice-lines');
var cmdSep = require('./tool/cmd-sep');

var gulpCmd = 'node ' + path.join(__dirname, '../bin/gulp.js');
var baseDir = path.join(__dirname, 'fixtures/config/flags/silent');

describe('config: flags.silent', function() {

  it('Should be silent if `flags.silent` is true in .gulp.*', function(done) {
    exec([
      'cd ' + path.join(baseDir, 't') + cmdSep,
      gulpCmd,
    ].join(' '), cb);

    function cb(err, stdout, stderr) {
      expect(err).toBeNull();
      expect(stderr).toEqual('');
      expect(stdout).toEqual('');
      done(err);
    }
  });

  it('Should not be silent if `flags.silent` is false in .gulp.*', function(done) {
    exec([
      'cd ' + path.join(baseDir, 'f') + cmdSep,
      gulpCmd,
    ].join(' '), cb);

    function cb(err, stdout, stderr) {
      expect(err).toBeNull();
      expect(stderr).toEqual('');
      expect(sliceLines(stdout, 1)).toEqual(
        'Starting \'default\'...\n' +
        'Finished \'default\' after ?\n' +
        ''
      );
      done(err);
    }
  });

  it('Should overridden by cli flag: --silent', function(done) {
    exec([
      'cd ' + path.join(baseDir, 'f') + cmdSep,
      gulpCmd,
      '--silent',
    ].join(' '), cb);

    function cb(err, stdout, stderr) {
      expect(err).toBeNull();
      expect(stderr).toEqual('');
      expect(stdout).toEqual('');
      done(err);
    }
  });

  it('Should overridden by cli flag: --no-silent', function(done) {
    exec([
      'cd ' + path.join(baseDir, 't') + cmdSep,
      gulpCmd,
      '--no-silent',
    ].join(' '), cb);

    function cb(err, stdout, stderr) {
      expect(err).toBeNull();
      expect(stderr).toEqual('');
      expect(sliceLines(stdout, 1)).toEqual(
        'Starting \'default\'...\n' +
        'Finished \'default\' after ?\n' +
        ''
      );
      done(err);
    }
  });

});
