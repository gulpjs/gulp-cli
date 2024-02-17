'use strict';

var expect = require('expect');
var exec = require('child_process').exec;
var fs = require('fs');
var path = require('path');

var sliceLines = require('./tool/slice-lines');
var gulp = require('./tool/gulp-cmd');

var baseDir = path.join(__dirname, '..');
var expectedDir = path.join(__dirname, 'expected');

describe('flag: --tasks', function() {

  it('prints the task list', function(done) {
    var opts = { cwd: baseDir };
    exec(gulp(
      '--tasks',
      '--sort-tasks',
      '--cwd ./test/fixtures/gulpfiles'
    ), opts, cb);

    function cb(err, stdout, stderr) {
      expect(err).toBeNull();
      expect(stderr).toEqual('');
      var filepath = path.join(expectedDir, 'flags-tasks.txt');
      var expected = fs.readFileSync(filepath, 'utf-8');
      expect(sliceLines(stdout, 1)).toEqual(expected);
      done(err);
    }
  });

  it('prints the task list with description and flags', function(done) {
    var opts = { cwd: baseDir };
    exec(gulp(
      '--tasks',
      '--sort-tasks',
      '--gulpfile ./test/fixtures/gulpfiles/with-desc-and-flags.js',
      '--cwd ./test/fixtures'
    ), opts, cb);

    function cb(err, stdout, stderr) {
      expect(err).toBeNull();
      expect(stderr).toEqual('');
      var filepath = path.join(expectedDir, 'with-desc-and-flags.txt');
      var expected = fs.readFileSync(filepath, 'utf-8');
      expect(sliceLines(stdout, 1)).toEqual(expected);
      done(err);
    }
  });

  it('prints the task list by gulp.task(s).unwrap and gulp.task(s)', function(done) {
    var opts = { cwd: baseDir };
    exec(gulp(
      '--tasks',
      '--sort-tasks',
      '--gulpfile ./test/fixtures/gulpfiles/by-unwrap-and-not-by-unwrap.js',
      '--cwd ./test/fixtures'
    ), opts, cb);

    function cb(err, stdout, stderr) {
      expect(err).toBeNull();
      expect(stderr).toEqual('');
      var filepath = path.join(expectedDir, 'by-unwrap-and-not-by-unwrap.txt');
      var expected = fs.readFileSync(filepath, 'utf-8');
      expect(sliceLines(stdout, 1)).toEqual(expected);
      done(err);
    }
  });

  it('prints the task list without --sort-tasks flag', function(done) {
    var opts = { cwd: baseDir };
    exec(gulp(
      '--tasks',
      '--gulpfile ./test/fixtures/gulpfiles/gulpfile-4.js'
    ), opts, cb);

    function cb(err, stdout, stderr) {
      expect(err).toBeNull();
      expect(stderr).toEqual('');
      var filepath = path.join(expectedDir, 'flags-tasks-unsorted.txt');
      var expected = fs.readFileSync(filepath, 'utf-8');
      expect(sliceLines(stdout, 1)).toEqual(expected);
      done(err);
    }
  });

  it('prints the task list with --sort-tasks flag', function(done) {
    var opts = { cwd: baseDir };
    exec(gulp(
      '--tasks',
      '--gulpfile ./test/fixtures/gulpfiles/gulpfile-4.js',
      '--sort-tasks'
    ), opts, cb);

    function cb(err, stdout, stderr) {
      expect(err).toBeNull();
      expect(stderr).toEqual('');
      var filepath = path.join(expectedDir, 'flags-tasks-sorted.txt');
      var expected = fs.readFileSync(filepath, 'utf-8');
      expect(sliceLines(stdout, 1)).toEqual(expected);
      done(err);
    }
  });

  it('prints the task list with --tasks-depth flag', function(done) {
    var opts = { cwd: baseDir };
    exec(gulp(
      '--tasks',
      '--gulpfile ./test/fixtures/gulpfiles/gulpfile-4.js',
      '--tasks-depth 4'
    ), opts, cb);

    function cb(err, stdout, stderr) {
      expect(err).toBeNull();
      expect(stderr).toEqual('');
      var filepath = path.join(expectedDir, 'flags-tasks-depth4.txt');
      var expected = fs.readFileSync(filepath, 'utf-8');
      expect(sliceLines(stdout, 1)).toEqual(expected);
      done(err);
    }
  });

  it('prints the top task only if negative tasks depth is specified', function(done) {
    var opts = { cwd: baseDir };
    exec(gulp(
      '--tasks',
      '--gulpfile ./test/fixtures/gulpfiles/gulpfile-4.js',
      '--tasks-depth -1'
    ), opts, cb);

    function cb(err, stdout, stderr) {
      expect(err).toBeNull();
      expect(stderr).toEqual('');
      var filepath = path.join(expectedDir, 'flags-tasks-depth1.txt');
      var expected = fs.readFileSync(filepath, 'utf-8');
      expect(sliceLines(stdout, 1)).toEqual(expected);
      done(err);
    }
  });

  it('prints the task list with --depth flag', function(done) {
    var opts = { cwd: baseDir };
    exec(gulp(
      '--tasks',
      '--gulpfile ./test/fixtures/gulpfiles/gulpfile-4.js',
      '--depth 4'
    ), opts, cb);

    function cb(err, stdout, stderr) {
      expect(err).toBeNull();
      expect(stderr).toEqual('');
      var filepath = path.join(expectedDir, 'flags-tasks-depth4.txt');
      var expected = fs.readFileSync(filepath, 'utf-8');
      expect(sliceLines(stdout, 1)).toEqual(expected);
      done(err);
    }
  });

  it('prints the task list with --compact-tasks flag', function(done) {
    var opts = { cwd: baseDir };
    exec(gulp(
      '--tasks',
      '--gulpfile ./test/fixtures/gulpfiles/gulpfile-4.js',
      '--compact-tasks'
    ), opts, cb);

    function cb(err, stdout, stderr) {
      expect(err).toBeNull();
      expect(stderr).toEqual('');
      var filepath = path.join(expectedDir, 'flags-tasks-compact.txt');
      var expected = fs.readFileSync(filepath, 'utf-8');
      expect(sliceLines(stdout, 1)).toEqual(expected);
      done(err);
    }
  });

});
