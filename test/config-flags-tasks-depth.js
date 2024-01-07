'use strict';

var expect = require('expect');
var exec = require('child_process').exec;
var path = require('path');
var fs = require('fs');

var sliceLines = require('./tool/slice-lines');
var gulp = require('./tool/gulp-cmd');

var baseDir = path.join(__dirname, 'fixtures/config/flags/tasksDepth');
var expectedDir = path.join(__dirname, 'expected');

describe('config: flags.tasksDepth', function() {

  it('Should limit depth of task list when `flags.tasksDepth` is specified', function(done) {
    var opts = { cwd: baseDir };
    exec(gulp('--tasks'), opts, cb);

    function cb(err, stdout, stderr) {
      var filepath = path.join(expectedDir, 'flags-tasks-depth4.txt');
      var expected = fs.readFileSync(filepath, 'utf-8');
      expect(sliceLines(stdout, 1)).toEqual(sliceLines(expected, 1));
      expect(stderr).toEqual('');
      done(err);
    }
  });

  it('Should overridden by cli flag: --tasks-depth', function(done) {
    var opts = { cwd: baseDir };
    exec(gulp('--tasks', '--tasks-depth', '2'), opts, cb);

    function cb(err, stdout, stderr) {
      var filepath = path.join(expectedDir, 'flags-tasks-depth2.txt');
      var expected = fs.readFileSync(filepath, 'utf-8');
      expect(sliceLines(stdout, 1)).toEqual(sliceLines(expected, 1));
      expect(stderr).toEqual('');
      done(err);
    }
  });
});
