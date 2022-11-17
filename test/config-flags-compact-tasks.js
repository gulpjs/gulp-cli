'use strict';

var expect = require('expect');
var exec = require('child_process').exec;
var path = require('path');
var fs = require('fs');

var sliceLines = require('./tool/slice-lines');
var cmdSep = require('./tool/cmd-sep');

var gulpCmd = 'node ' + path.join(__dirname, '../bin/gulp.js');
var baseDir = path.join(__dirname, 'fixtures/config/flags/compactTasks');
var expectedDir = path.join(__dirname, 'expected');

describe('config: flags.compactTasks', function() {

  it('Should compact task lists when `flags.compactTasks` is true in .gulp.*', function(done) {
    exec([
      'cd ' + path.join(baseDir, 't') + cmdSep,
      gulpCmd,
      '--tasks',
    ].join(' '), cb);

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
    exec([
      'cd ' + path.join(baseDir, 'f') + cmdSep,
      gulpCmd,
      '--tasks',
    ].join(' '), cb);

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
    exec([
      'cd ' + path.join(baseDir, 'f') + cmdSep,
      gulpCmd,
      '--tasks',
      '--compact-tasks',
    ].join(' '), cb);

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
    exec([
      'cd ' + path.join(baseDir, 't') + cmdSep,
      gulpCmd,
      '--tasks',
      '--no-compact-tasks',
    ].join(' '), cb);

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
