'use strict';

var expect = require('expect');
var fs = require('fs');
var path = require('path');
var skipLines = require('gulp-test-tools').skipLines;
var eraseTime = require('gulp-test-tools').eraseTime;
var runner = require('gulp-test-tools').gulpRunner;
var stripAnsi = require('../lib/shared/ansi').strip;

var expectedDir = path.join(__dirname, 'expected');

describe('flag: --tasks', function() {

  it('prints the task list', function(done) {
    runner({ verbose: false })
      .gulp('--tasks --sort-tasks --cwd ./test/fixtures/gulpfiles')
      .run(cb);

    function cb(err, stdout, stderr) {
      expect(err).toEqual(null);
      expect(stderr).toEqual('');
      var filepath = path.join(expectedDir, 'flags-tasks.txt');
      var expected = fs.readFileSync(filepath, 'utf-8');
      stdout = eraseTime(stripAnsi(skipLines(stdout, 1)));
      expect(stdout).toEqual(expected);
      done(err);
    }
  });

  it('print the task list with description and flags', function(done) {
    runner({ verbose: false })
      .gulp('--tasks', '--sort-tasks',
        '--gulpfile ./test/fixtures/gulpfiles/with-desc-and-flags.js',
        '--cwd ./test/fixtures')
      .run(cb);

    function cb(err, stdout, stderr) {
      expect(err).toEqual(null);
      expect(stderr).toEqual('');
      var filepath = path.join(expectedDir, 'with-desc-and-flags.txt');
      var expected = fs.readFileSync(filepath, 'utf-8');
      stdout = eraseTime(stripAnsi(skipLines(stdout, 1)));
      expect(stdout).toEqual(expected);
      done(err);
    }
  });

  it('print the task list by gulp.task(s).unwrap and gulp.task(s)',
  function(done) {
    runner({ verbose: false })
      .gulp('--tasks', '--sort-tasks',
        '--gulpfile ./test/fixtures/gulpfiles/by-unwrap-and-not-by-unwrap.js',
        '--cwd ./test/fixtures')
      .run(cb);

    function cb(err, stdout, stderr) {
      expect(err).toEqual(null);
      expect(stderr).toEqual('');
      var filepath = path.join(expectedDir, 'by-unwrap-and-not-by-unwrap.txt');
      var expected = fs.readFileSync(filepath, 'utf-8');
      stdout = eraseTime(stripAnsi(skipLines(stdout, 1)));
      expect(stdout).toEqual(expected);
      done(err);
    }
  });

  it('prints the task list without --sort-tasks flag', function(done) {
    runner({ verbose: false })
      .gulp('--tasks --gulpfile ./test/fixtures/gulpfiles/gulpfile-4.js')
      .run(cb);

    function cb(err, stdout, stderr) {
      expect(err).toEqual(null);
      expect(stderr).toEqual('');
      var filepath = path.join(expectedDir, 'flags-tasks-unsorted.txt');
      var expected = fs.readFileSync(filepath, 'utf-8');
      stdout = eraseTime(stripAnsi(skipLines(stdout, 1)));
      expect(stdout).toEqual(expected);
      done(err);
    }
  });

  it('prints the task list with --sort-tasks flag', function(done) {
    runner({ verbose: false })
      .gulp('--tasks --gulpfile ./test/fixtures/gulpfiles/gulpfile-4.js',
        '--sort-tasks')
      .run(cb);

    function cb(err, stdout, stderr) {
      expect(err).toEqual(null);
      expect(stderr).toEqual('');
      var filepath = path.join(expectedDir, 'flags-tasks-sorted.txt');
      var expected = fs.readFileSync(filepath, 'utf-8');
      stdout = eraseTime(stripAnsi(skipLines(stdout, 1)));
      expect(stdout).toEqual(expected);
      done(err);
    }
  });

  it('prints the task list with --tasks-depth flag', function(done) {
    runner({ verbose: false })
      .gulp('--tasks --gulpfile ./test/fixtures/gulpfiles/gulpfile-4.js',
        '--tasks-depth 4')
      .run(cb);

    function cb(err, stdout, stderr) {
      expect(err).toEqual(null);
      expect(stderr).toEqual('');
      var filepath = path.join(expectedDir, 'flags-tasks-depth4.txt');
      var expected = fs.readFileSync(filepath, 'utf-8');
      stdout = eraseTime(stripAnsi(skipLines(stdout, 1)));
      expect(stdout).toEqual(expected);
      done(err);
    }
  });

  it('prints the task list with --depth flag', function(done) {
    runner({ verbose: false })
      .gulp('--tasks --gulpfile ./test/fixtures/gulpfiles/gulpfile-4.js',
        '--depth 4')
      .run(cb);

    function cb(err, stdout, stderr) {
      expect(err).toEqual(null);
      expect(stderr).toEqual('');
      var filepath = path.join(expectedDir, 'flags-tasks-depth4.txt');
      var expected = fs.readFileSync(filepath, 'utf-8');
      stdout = eraseTime(stripAnsi(skipLines(stdout, 1)));
      expect(stdout).toEqual(expected);
      done(err);
    }
  });

  it('prints the task list with --compact-tasks flag', function(done) {
    runner({ verbose: false })
      .gulp('--tasks --gulpfile ./test/fixtures/gulpfiles/gulpfile-4.js',
        '--compact-tasks')
      .run(cb);

    function cb(err, stdout, stderr) {
      expect(err).toEqual(null);
      expect(stderr).toEqual('');
      var filepath = path.join(expectedDir, 'flags-tasks-compact.txt');
      var expected = fs.readFileSync(filepath, 'utf-8');
      stdout = eraseTime(stripAnsi(skipLines(stdout, 1)));
      expect(stdout).toEqual(expected);
      done(err);
    }
  });

});
