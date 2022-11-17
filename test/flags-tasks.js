'use strict';

var expect = require('expect');
var exec = require('child_process').exec;
var fs = require('fs');
var path = require('path');

var sliceLines = require('./tool/slice-lines');
var cmdSep = require('./tool/cmd-sep');

var gulpCmd = 'node ' + path.join(__dirname, '../bin/gulp.js');
var baseDir = path.join(__dirname, '..');
var expectedDir = path.join(__dirname, 'expected');

describe('flag: --tasks', function() {

  it('prints the task list', function(done) {
    exec([
      'cd ' + baseDir + cmdSep,
      gulpCmd,
      '--tasks --sort-tasks --cwd ./test/fixtures/gulpfiles',
    ].join(' '), cb);

    function cb(err, stdout, stderr) {
      expect(err).toEqual(null);
      expect(stderr).toEqual('');
      var filepath = path.join(expectedDir, 'flags-tasks.txt');
      var expected = fs.readFileSync(filepath, 'utf-8');
      expect(sliceLines(stdout, 1)).toEqual(expected);
      done(err);
    }
  });

  it('print the task list with description and flags', function(done) {
    exec([
      'cd ' + baseDir + cmdSep,
      gulpCmd,
      '--tasks', '--sort-tasks',
      '--gulpfile ./test/fixtures/gulpfiles/with-desc-and-flags.js',
      '--cwd ./test/fixtures',
    ].join(' '), cb);

    function cb(err, stdout, stderr) {
      expect(err).toEqual(null);
      expect(stderr).toEqual('');
      var filepath = path.join(expectedDir, 'with-desc-and-flags.txt');
      var expected = fs.readFileSync(filepath, 'utf-8');
      expect(sliceLines(stdout, 1)).toEqual(expected);
      done(err);
    }
  });

  it('print the task list by gulp.task(s).unwrap and gulp.task(s)', function(done) {
    exec([
      'cd ' + baseDir + cmdSep,
      gulpCmd,
      '--tasks', '--sort-tasks',
      '--gulpfile ./test/fixtures/gulpfiles/by-unwrap-and-not-by-unwrap.js',
      '--cwd ./test/fixtures',
    ].join(' '), cb);

    function cb(err, stdout, stderr) {
      expect(err).toEqual(null);
      expect(stderr).toEqual('');
      var filepath = path.join(expectedDir, 'by-unwrap-and-not-by-unwrap.txt');
      var expected = fs.readFileSync(filepath, 'utf-8');
      expect(sliceLines(stdout, 1)).toEqual(expected);
      done(err);
    }
  });

  it('prints the task list without --sort-tasks flag', function(done) {
    exec([
      'cd ' + baseDir + cmdSep,
      gulpCmd,
      '--tasks --gulpfile ./test/fixtures/gulpfiles/gulpfile-4.js',
    ].join(' '), cb);

    function cb(err, stdout, stderr) {
      expect(err).toEqual(null);
      expect(stderr).toEqual('');
      var filepath = path.join(expectedDir, 'flags-tasks-unsorted.txt');
      var expected = fs.readFileSync(filepath, 'utf-8');
      expect(sliceLines(stdout, 1)).toEqual(expected);
      done(err);
    }
  });

  it('prints the task list with --sort-tasks flag', function(done) {
    exec([
      'cd ' + baseDir + cmdSep,
      gulpCmd,
      '--tasks --gulpfile ./test/fixtures/gulpfiles/gulpfile-4.js',
      '--sort-tasks',
    ].join(' '), cb);

    function cb(err, stdout, stderr) {
      expect(err).toEqual(null);
      expect(stderr).toEqual('');
      var filepath = path.join(expectedDir, 'flags-tasks-sorted.txt');
      var expected = fs.readFileSync(filepath, 'utf-8');
      expect(sliceLines(stdout, 1)).toEqual(expected);
      done(err);
    }
  });

  it('prints the task list with --tasks-depth flag', function(done) {
    exec([
      'cd ' + baseDir + cmdSep,
      gulpCmd,
      '--tasks --gulpfile ./test/fixtures/gulpfiles/gulpfile-4.js',
      '--tasks-depth 4',
    ].join(' '), cb);

    function cb(err, stdout, stderr) {
      expect(err).toEqual(null);
      expect(stderr).toEqual('');
      var filepath = path.join(expectedDir, 'flags-tasks-depth4.txt');
      var expected = fs.readFileSync(filepath, 'utf-8');
      expect(sliceLines(stdout, 1)).toEqual(expected);
      done(err);
    }
  });

  it('prints the task list with --depth flag', function(done) {
    exec([
      'cd ' + baseDir + cmdSep,
      gulpCmd,
      '--tasks --gulpfile ./test/fixtures/gulpfiles/gulpfile-4.js',
      '--depth 4',
    ].join(' '), cb);

    function cb(err, stdout, stderr) {
      expect(err).toEqual(null);
      expect(stderr).toEqual('');
      var filepath = path.join(expectedDir, 'flags-tasks-depth4.txt');
      var expected = fs.readFileSync(filepath, 'utf-8');
      expect(sliceLines(stdout, 1)).toEqual(expected);
      done(err);
    }
  });

  it('prints the task list with --compact-tasks flag', function(done) {
    exec([
      'cd ' + baseDir + cmdSep,
      gulpCmd,
      '--tasks --gulpfile ./test/fixtures/gulpfiles/gulpfile-4.js',
      '--compact-tasks',
    ].join(' '), cb);

    function cb(err, stdout, stderr) {
      expect(err).toEqual(null);
      expect(stderr).toEqual('');
      var filepath = path.join(expectedDir, 'flags-tasks-compact.txt');
      var expected = fs.readFileSync(filepath, 'utf-8');
      expect(sliceLines(stdout, 1)).toEqual(expected);
      done(err);
    }
  });

});
