'use strict';

var expect = require('expect');
var exec = require('child_process').exec;
var path = require('path');
var fs = require('fs');

var sliceLines = require('./tool/slice-lines');
var gulp = require('./tool/gulp-cmd');

var baseDir = path.join(__dirname, 'fixtures/config/flags/compactTasks');
var expectedDir = path.join(__dirname, 'expected');

describe('config: flags.compactTasks', function() {

  it('Should compact task lists when `flags.compactTasks` is true in .gulp.*', function(done) {
    var opts = { cwd: path.join(baseDir, 't') };
    exec(gulp('--tasks'), opts, cb);

    function cb(err, stdout, stderr) {
      var filepath = path.join(expectedDir, 'flags-tasks-compact.txt');
      var expected = fs.readFileSync(filepath, 'utf-8');
      expected = sliceLines(expected, 2);
      stdout = sliceLines(stdout, 2);
      expect(stdout).toEqual(expected);
      expect(stderr).toEqual('');
      done(err);
    }
  });

  it('Should not compact task lists when `flags.compactTasks` is false in .gulp.*', function(done) {
    var opts = { cwd: path.join(baseDir, 'f') };
    exec(gulp('--tasks'), opts, cb);

    function cb(err, stdout, stderr) {
      var filepath = path.join(expectedDir, 'flags-tasks-unsorted.txt');
      var expected = fs.readFileSync(filepath, 'utf-8');
      expected = sliceLines(expected, 2);
      stdout = sliceLines(stdout, 2);
      expect(stdout).toEqual(expected);
      expect(stderr).toEqual('');
      done(err);
    }
  });

  it('Should overridden by cli flag: --compact-tasks', function(done) {
    var opts = { cwd: path.join(baseDir, 'f') };
    exec(gulp('--tasks', '--compact-tasks'), opts, cb);

    function cb(err, stdout, stderr) {
      var filepath = path.join(expectedDir, 'flags-tasks-compact.txt');
      var expected = fs.readFileSync(filepath, 'utf-8');
      expected = sliceLines(expected, 2);
      stdout = sliceLines(stdout, 2);
      expect(stdout).toEqual(expected);
      expect(stderr).toEqual('');
      done(err);
    }
  });

  it('Should overridden by cli flag: --no-compact-tasks', function(done) {
    var opts = { cwd: path.join(baseDir, 't') };
    exec(gulp('--tasks', '--no-compact-tasks'), opts, cb);

    function cb(err, stdout, stderr) {
      var filepath = path.join(expectedDir, 'flags-tasks-unsorted.txt');
      var expected = fs.readFileSync(filepath, 'utf-8');
      expected = sliceLines(expected, 2);
      stdout = sliceLines(stdout, 2);
      expect(stdout).toEqual(expected);
      expect(stderr).toEqual('');
      done(err);
    }
  });
});
