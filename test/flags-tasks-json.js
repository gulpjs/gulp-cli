'use strict';

var expect = require('expect');
var exec = require('child_process').exec;
var fs = require('fs');
var path = require('path');
var rimraf = require('rimraf');

var gulp = require('./tool/gulp-cmd');

var baseDir = path.join(__dirname, '..');
var expected = require(path.join(__dirname, 'expected/flags-tasks-json.json'));

describe('flag: --tasks-json', function() {

  it('prints the task list with no args', function(done) {
    var opts = { cwd: baseDir };
    exec(gulp(
      '--tasks-json',
      '--gulpfile ./test/fixtures/gulpfiles/gulpfile.js'
    ), opts, cb);

    function cb(err, stdout, stderr) {
      expect(err).toBeNull();
      expect(stderr).toEqual('');
      expect(JSON.parse(stdout)).toEqual(expected);
      done(err);
    }
  });

  it('prints the task list with the default description', function(done) {
    var cwdPath = __dirname;
    var gulpfilePath = path.join(__dirname, 'fixtures/gulpfiles/gulpfile.js');

    var opts = { cwd: baseDir };
    exec(gulp(
      '--tasks-json',
      '--cwd ', cwdPath,
      '--gulpfile ', gulpfilePath
    ), opts, cb);

    function cb(err, stdout, stderr) {
      expect(err).toBeNull();
      expect(stderr).toEqual('');
      var jsonObj = JSON.parse(stdout);
      expect(jsonObj.label).toMatch('Tasks for ');
      expect(jsonObj.nodes).toEqual(expected.nodes);
      done(err);
    }
  });

  it('writes the task list to file with path', function(done) {
    var output = path.join(__dirname, '/output/');
    rimraf.sync(output);
    fs.mkdirSync(output);

    var opts = { cwd: baseDir };
    exec(gulp(
      '--tasks-json ../../output/tasks.json',
      '--gulpfile ./test/fixtures/gulpfiles/gulpfile.js'
    ), opts, cb);

    function cb(err, stdout, stderr) {
      expect(err).toBeNull();
      expect(stderr).toEqual('');
      stdout = stdout.split('\n').slice(1).join('\n');
      expect(stdout).toEqual('');
      var file = fs.readFileSync(path.join(output, '/tasks.json'), 'utf8');
      var parsedJson = JSON.parse(file);
      expect(parsedJson).toEqual(expected);
      rimraf.sync(output);
      done(err);
    }
  });

  it('avoids printing "Requiring external module *"', function(done) {
    // Disable the timeout for old node versions
    this.timeout(0);

    var opts = { cwd: baseDir };
    exec(gulp(
      '--tasks-json',
      '--gulpfile ./test/fixtures/gulpfiles/gulpfile-babel.babel.js'
    ), opts, cb);

    function cb(err, stdout, stderr) {
      expect(err).toBeNull();
      expect(stderr).toEqual('');
      expect(JSON.parse(stdout)).toEqual(expected);
      done(err);
    }
  });
});
