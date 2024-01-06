'use strict';

var expect = require('expect');
var exec = require('child_process').exec;
var path = require('path');
var fs = require('fs');

var gulp = require('./tool/gulp-cmd');

var baseDir = path.join(__dirname, '..');
var outputFile = path.join(__dirname, 'expected/flags-tasks-simple.txt');
var outputText = fs.readFileSync(outputFile, 'utf8');

describe('flag: --tasks-simple', function() {

  it('prints the task list in simple format', function(done) {
    var opts = { cwd: baseDir };
    exec(gulp(
      '--tasks-simple',
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
    // Disable the timeout for old node versions
    this.timeout(0);

    var opts = { cwd: baseDir };
    exec(gulp(
      '--tasks-simple',
      '--gulpfile ./test/fixtures/gulpfiles/gulpfile-babel.babel.js'
    ), opts, cb);

    function cb(err, stdout, stderr) {
      expect(err).toBeNull();
      expect(stderr).toEqual('');
      expect(stdout).toEqual(outputText);
      done(err);
    }
  });

});
