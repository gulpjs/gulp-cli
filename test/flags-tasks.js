'use strict';

var expect = require('expect');
var exec = require('child_process').exec;
var fs = require('fs');
var path = require('path');

var sliceLines = require('./tool/slice-lines');
var cd = require('./tool/gulp-cmd').cd;

var baseDir = path.join(__dirname, '..');
var expectedDir = path.join(__dirname, 'expected');

describe('flag: --tasks', function() {

  it('prints the task list', function(done) {
    exec(cd(baseDir).gulp(
      '--tasks',
      '--sort-tasks',
      '--cwd ./test/fixtures/gulpfiles'
    ), cb);

    function cb(err, stdout, stderr) {
      expect(err).toBeNull();
      expect(stderr).toEqual('');
      var filepath = path.join(expectedDir, 'flags-tasks.txt');
      var expected = fs.readFileSync(filepath, 'utf-8');
      expect(sliceLines(stdout, 1)).toEqual(expected);
      done(err);
    }
  });

  it('print the task list with description and flags', function(done) {
    exec(cd(baseDir).gulp(
      '--tasks',
      '--sort-tasks',
      '--gulpfile ./test/fixtures/gulpfiles/with-desc-and-flags.js',
      '--cwd ./test/fixtures'
    ), cb);

    function cb(err, stdout, stderr) {
      expect(err).toBeNull();
      expect(stderr).toEqual('');
      var filepath = path.join(expectedDir, 'with-desc-and-flags.txt');
      var expected = fs.readFileSync(filepath, 'utf-8');
      expect(sliceLines(stdout, 1)).toEqual(expected);
      done(err);
    }
  });

  it('print the task list by gulp.task(s).unwrap and gulp.task(s)', function(done) {
    exec(cd(baseDir).gulp(
      '--tasks',
      '--sort-tasks',
      '--gulpfile ./test/fixtures/gulpfiles/by-unwrap-and-not-by-unwrap.js',
      '--cwd ./test/fixtures'
    ), cb);

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
    exec(cd(baseDir).gulp(
      '--tasks',
      '--gulpfile ./test/fixtures/gulpfiles/gulpfile-4.js'
    ), cb);

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
    exec(cd(baseDir).gulp(
      '--tasks',
      '--gulpfile ./test/fixtures/gulpfiles/gulpfile-4.js',
      '--sort-tasks'
    ), cb);

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
    exec(cd(baseDir).gulp(
      '--tasks',
      '--gulpfile ./test/fixtures/gulpfiles/gulpfile-4.js',
      '--tasks-depth 4'
    ), cb);

    function cb(err, stdout, stderr) {
      expect(err).toBeNull();
      expect(stderr).toEqual('');
      var filepath = path.join(expectedDir, 'flags-tasks-depth4.txt');
      var expected = fs.readFileSync(filepath, 'utf-8');
      expect(sliceLines(stdout, 1)).toEqual(expected);
      done(err);
    }
  });

  it('prints the task list with --depth flag', function(done) {
    exec(cd(baseDir).gulp(
      '--tasks',
      '--gulpfile ./test/fixtures/gulpfiles/gulpfile-4.js',
      '--depth 4'
    ), cb);

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
    exec(cd(baseDir).gulp(
      '--tasks',
      '--gulpfile ./test/fixtures/gulpfiles/gulpfile-4.js',
      '--compact-tasks'
    ), cb);

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
