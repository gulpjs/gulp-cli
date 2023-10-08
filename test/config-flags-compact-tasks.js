'use strict';

var expect = require('expect');
var exec = require('child_process').exec;
var path = require('path');
var fs = require('fs');

var sliceLines = require('./tool/slice-lines');
var cd = require('./tool/gulp-cmd').cd;

var baseDir = path.join(__dirname, 'fixtures/config/flags/compactTasks');
var expectedDir = path.join(__dirname, 'expected');

describe('config: flags.compactTasks', function() {

  it('Should compact task lists when `flags.compactTasks` is true in .gulp.*', function(done) {
    exec(cd(baseDir, 't').gulp('--tasks'), cb);

    function cb(err, stdout, stderr) {
      var filepath = path.join(expectedDir, 'flags-tasks-compact.txt');
      var expected = fs.readFileSync(filepath, 'utf-8');
      expected = sliceLines(expected, 1);
      stdout = sliceLines(stdout, 1);
      expect(stdout).toEqual(expected);
      expect(stderr).toEqual('');
      done(err);
    }
  });

  it('Should not compact task lists when `flags.compactTasks` is false in .gulp.*', function(done) {
    exec(cd(baseDir, 'f').gulp('--tasks'), cb);

    function cb(err, stdout, stderr) {
      var filepath = path.join(expectedDir, 'flags-tasks-unsorted.txt');
      var expected = fs.readFileSync(filepath, 'utf-8');
      expected = sliceLines(expected, 1);
      stdout = sliceLines(stdout, 1);
      expect(stdout).toEqual(expected);
      expect(stderr).toEqual('');
      done(err);
    }
  });

  it('Should overridden by cli flag: --compact-tasks', function(done) {
    exec(cd(baseDir, 'f').gulp('--tasks', '--compact-tasks'), cb);

    function cb(err, stdout, stderr) {
      var filepath = path.join(expectedDir, 'flags-tasks-compact.txt');
      var expected = fs.readFileSync(filepath, 'utf-8');
      expected = sliceLines(expected, 1);
      stdout = sliceLines(stdout, 1);
      expect(stdout).toEqual(expected);
      expect(stderr).toEqual('');
      done(err);
    }
  });

  it('Should overridden by cli flag: --no-compact-tasks', function(done) {
    exec(cd(baseDir, 't').gulp('--tasks', '--no-compact-tasks'), cb);

    function cb(err, stdout, stderr) {
      var filepath = path.join(expectedDir, 'flags-tasks-unsorted.txt');
      var expected = fs.readFileSync(filepath, 'utf-8');
      expected = sliceLines(expected, 1);
      stdout = sliceLines(stdout, 1);
      expect(stdout).toEqual(expected);
      expect(stderr).toEqual('');
      done(err);
    }
  });
});
