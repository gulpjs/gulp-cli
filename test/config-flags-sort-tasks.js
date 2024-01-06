'use strict';

var expect = require('expect');
var exec = require('child_process').exec;
var path = require('path');
var fs = require('fs');

var sliceLines = require('./tool/slice-lines');
var gulp = require('./tool/gulp-cmd');

var baseDir = path.join(__dirname, 'fixtures/config/flags/sortTasks');
var expectedDir = path.join(__dirname, 'expected');

describe('config: flags.sortTasks', function() {

  it('Should sort top tasks in task list when `flags.sortTasks` is true in .gulp.*', function(done) {
    var opts = { cwd: path.join(baseDir, 't') };
    exec(gulp('--tasks'), opts, cb);

    function cb(err, stdout, stderr) {
      var filepath = path.join(expectedDir, 'flags-tasks-sorted.txt');
      var expected = fs.readFileSync(filepath, 'utf-8');
      expect(sliceLines(stdout, 1)).toEqual(sliceLines(expected, 1));
      expect(stderr).toEqual('');
      done(err);
    }
  });

  it('Should sort top tasks in task list when `flags.sortTasks` is false in .gulp.*', function(done) {
    var opts = { cwd: path.join(baseDir, 'f') };
    exec(gulp('--tasks'), opts, cb);

    function cb(err, stdout, stderr) {
      var filepath = path.join(expectedDir, 'flags-tasks-unsorted.txt');
      var expected = fs.readFileSync(filepath, 'utf-8');
      expect(sliceLines(stdout, 1)).toEqual(sliceLines(expected, 1));
      expect(stderr).toEqual('');
      done(err);
    }
  });

  it('Should overridden by cli flag: --sort-tasks', function(done) {
    var opts = { cwd: path.join(baseDir, 'f') };
    exec(gulp('--tasks', '--sort-tasks'), opts, cb);

    function cb(err, stdout, stderr) {
      var filepath = path.join(expectedDir, 'flags-tasks-sorted.txt');
      var expected = fs.readFileSync(filepath, 'utf-8');
      expect(sliceLines(stdout, 1)).toEqual(sliceLines(expected, 1));
      expect(stderr).toEqual('');
      done(err);
    }
  });

  it('Should overridden by cli flag: --no-sort-tasks', function(done) {
    var opts = { cwd: path.join(baseDir, 't') };
    exec(gulp('--tasks', '--no-sort-tasks'), opts, cb);

    function cb(err, stdout, stderr) {
      var filepath = path.join(expectedDir, 'flags-tasks-unsorted.txt');
      var expected = fs.readFileSync(filepath, 'utf-8');
      expect(sliceLines(stdout, 1)).toEqual(sliceLines(expected, 1));
      expect(stderr).toEqual('');
      done(err);
    }
  });

});
