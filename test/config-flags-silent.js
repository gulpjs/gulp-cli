'use strict';

var expect = require('expect');
var exec = require('child_process').exec;
var path = require('path');

var sliceLines = require('./tool/slice-lines');
var cd = require('./tool/gulp-cmd').cd;

var baseDir = path.join(__dirname, 'fixtures/config/flags/silent');

describe('config: flags.silent', function() {

  it('Should be silent if `flags.silent` is true in .gulp.*', function(done) {
    exec(cd(baseDir, 't').gulp(), cb);

    function cb(err, stdout, stderr) {
      expect(err).toBeNull();
      expect(stderr).toEqual('');
      expect(stdout).toEqual('');
      done(err);
    }
  });

  it('Should not be silent if `flags.silent` is false in .gulp.*', function(done) {
    exec(cd(baseDir, 'f').gulp(), cb);

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
    exec(cd(baseDir, 'f').gulp('--silent'), cb);

    function cb(err, stdout, stderr) {
      expect(err).toBeNull();
      expect(stderr).toEqual('');
      expect(stdout).toEqual('');
      done(err);
    }
  });

  it('Should overridden by cli flag: --no-silent', function(done) {
    exec(cd(baseDir, 't').gulp('--no-silent'), cb);

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
