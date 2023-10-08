'use strict';

var expect = require('expect');
var exec = require('child_process').exec;
var path = require('path');
var fs = require('fs');

var cd = require('./tool/gulp-cmd').cd;

var baseDir = path.join(__dirname, '..');
var outputFile = path.join(__dirname, 'expected/flags-help.txt');
var outputText = fs.readFileSync(outputFile, 'utf8');

describe('flag: --help', function() {

  it('shows help using --help', function(done) {
    exec(cd(baseDir).gulp(
      '--help',
      '--cwd ./test/fixtures/gulpfiles'
    ), cb);

    function cb(err, stdout, stderr) {
      expect(err).toBeNull();
      expect(stderr).toEqual('');
      expect(stdout).toEqual(outputText);
      done(err);
    }
  });

  it('shows help using short --h', function(done) {
    exec(cd(baseDir).gulp(
      '--h',
      '--cwd ./test/fixtures/gulpfiles'
    ), cb);

    function cb(err, stdout, stderr) {
      expect(err).toBeNull();
      expect(stderr).toEqual('');
      expect(stdout).toEqual(outputText);
      done(err);
    }
  });

  it('avoids printing "Requiring external module *"', function(done) {
    exec(cd(baseDir).gulp(
      '--help',
      '--gulpfile ./test/fixtures/gulpfiles/gulpfile-babel.babel.js'
    ), cb);

    function cb(err, stdout, stderr) {
      expect(err).toBeNull();
      expect(stderr).toEqual('');
      expect(stdout).toEqual(outputText);
      done(err);
    }
  });

});
