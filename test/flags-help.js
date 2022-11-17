'use strict';

var expect = require('expect');
var exec = require('child_process').exec;
var path = require('path');
var fs = require('fs');

var cmdSep = require('./tool/cmd-sep');

var gulpCmd = 'node ' + path.join(__dirname, '../bin/gulp.js');
var baseDir = path.join(__dirname, '..');
var outputFile = path.join(__dirname, 'expected/flags-help.txt');
var outputText = fs.readFileSync(outputFile, 'utf8');

describe('flag: --help', function() {

  it('shows help using --help', function(done) {
    exec([
      'cd ' + baseDir + cmdSep,
      gulpCmd,
      '--help',
      '--cwd ./test/fixtures/gulpfiles',
    ].join(' '), cb);

    function cb(err, stdout, stderr) {
      expect(err).toEqual(null);
      expect(stderr).toEqual('');
      expect(stdout).toEqual(outputText);
      done(err);
    }
  });

  it('shows help using short --h', function(done) {
    exec([
      'cd ' + baseDir + cmdSep,
      gulpCmd,
      '--h',
      '--cwd ./test/fixtures/gulpfiles',
    ].join(' '), cb);

    function cb(err, stdout, stderr) {
      expect(err).toEqual(null);
      expect(stderr).toEqual('');
      expect(stdout).toEqual(outputText);
      done(err);
    }
  });

  it('avoids printing "Requiring external module *"', function(done) {
    exec([
      'cd ' + baseDir + cmdSep,
      gulpCmd,
      '--help',
      '--gulpfile ./test/fixtures/gulpfiles/gulpfile-babel.babel.js',
    ].join(' '), cb);

    function cb(err, stdout, stderr) {
      expect(err).toEqual(null);
      expect(stderr).toEqual('');
      expect(stdout).toEqual(outputText);
      done(err);
    }
  });

});
