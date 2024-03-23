'use strict';

var expect = require('expect');
var exec = require('child_process').exec;
var path = require('path');
var fs = require('fs');

var gulp = require('./tool/gulp-cmd');

var baseDir = path.join(__dirname, '..');
var outputFile = path.join(__dirname, 'expected/flags-help.txt');
var outputText = fs.readFileSync(outputFile, 'utf8');

describe('flag: --help', function() {

  it('shows help using --help', function(done) {
    var opts = { cwd: baseDir };
    exec(gulp(
      '--help',
      '--cwd ./test/fixtures/gulpfiles'
    ), opts, cb);

    function cb(err, stdout, stderr) {
      expect(err).toBeNull();
      expect(stderr).toEqual('');
      expect(stdout).toEqual(outputText);
      done(err);
    }
  });

  it('shows help using short --h', function(done) {
    var opts = { cwd: baseDir };
    exec(gulp(
      '--h',
      '--cwd ./test/fixtures/gulpfiles'
    ), opts, cb);

    function cb(err, stdout, stderr) {
      expect(err).toBeNull();
      expect(stderr).toEqual('');
      expect(stdout).toEqual(outputText);
      done(err);
    }
  });

  it('avoids printing "Requiring external module *"', function(done) {
    var opts = { cwd: baseDir };
    exec(gulp(
      '--help',
      '--gulpfile ./test/fixtures/gulpfiles/gulpfile-babel.babel.js'
    ), opts, cb);

    function cb(err, stdout, stderr) {
      expect(err).toBeNull();
      expect(stderr).toEqual('');
      expect(stdout).toEqual(outputText);
      done(err);
    }
  });

  it('show error message and help if options are invalid', function(done) {
    var opts = { cwd: baseDir };
    exec(gulp('-f'), opts, cb);

    function cb(err, stdout, stderr) {
      expect(err).not.toBeNull();
      expect(stdout).toEqual('');
      expect(stderr).toEqual('Not enough arguments following: f\n' + outputText);
      done();
    }
  });
});
