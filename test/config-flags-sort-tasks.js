'use strict';

var expect = require('expect');
var exec = require('child_process').exec;
var path = require('path');
var fs = require('fs');

var sliceLines = require('./tool/slice-lines');
var cd = require('./tool/gulp-cmd').cd;

var baseDir = path.join(__dirname, 'fixtures/config/flags/sortTasks');
var expectedDir = path.join(__dirname, 'expected');

describe('config: flags.sortTasks', function() {

  it('Should sort top tasks in task list when `flags.sortTasks` is true in .gulp.*', function(done) {
    exec(cd(baseDir, 't').gulp('--tasks'), cb);

    function cb(err, stdout, stderr) {
      var filepath = path.join(expectedDir, 'flags-tasks-sorted.txt');
      var expected = fs.readFileSync(filepath, 'utf-8');
      expect(sliceLines(stdout, 1)).toEqual(sliceLines(expected, 1));
      expect(stderr).toEqual('');
      done(err);
    }
  });

  it('Should sort top tasks in task list when `flags.sortTasks` is false in .gulp.*', function(done) {
    exec(cd(baseDir, 'f').gulp('--tasks'), cb);

    function cb(err, stdout, stderr) {
      var filepath = path.join(expectedDir, 'flags-tasks-unsorted.txt');
      var expected = fs.readFileSync(filepath, 'utf-8');
      expect(sliceLines(stdout, 1)).toEqual(sliceLines(expected, 1));
      expect(stderr).toEqual('');
      done(err);
    }
  });

  it('Should overridden by cli flag: --sort-tasks', function(done) {
    exec(cd(baseDir, 'f').gulp('--tasks', '--sort-tasks'), cb);

    function cb(err, stdout, stderr) {
      var filepath = path.join(expectedDir, 'flags-tasks-sorted.txt');
      var expected = fs.readFileSync(filepath, 'utf-8');
      expect(sliceLines(stdout, 1)).toEqual(sliceLines(expected, 1));
      expect(stderr).toEqual('');
      done(err);
    }
  });

  it('Should overridden by cli flag: --no-sort-tasks', function(done) {
    exec(cd(baseDir, 't').gulp('--tasks', '--no-sort-tasks'), cb);

    function cb(err, stdout, stderr) {
      var filepath = path.join(expectedDir, 'flags-tasks-unsorted.txt');
      var expected = fs.readFileSync(filepath, 'utf-8');
      expect(sliceLines(stdout, 1)).toEqual(sliceLines(expected, 1));
      expect(stderr).toEqual('');
      done(err);
    }
  });

});
