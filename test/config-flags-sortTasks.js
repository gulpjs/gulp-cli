'use strict';

var expect = require('expect');
var path = require('path');
var fs = require('fs');
var skipLines = require('gulp-test-tools').skipLines;
var eraseTime = require('gulp-test-tools').eraseTime;

var fixturesDir = path.join(__dirname, 'fixtures/config');
var expectedDir = path.join(__dirname, 'expected');
var runner = require('gulp-test-tools').gulpRunner().basedir(fixturesDir);

describe('config: flags.sortTasks', function() {

  // This test fails because the cwd gets changed to `gulp-cli/test/fixtures/gulpfiles`
  // but the .gulp.* file in that directory doesn't get resolved
  it.skip('Should sort top tasks in task list when `flags.sortTasks` is true in .gulp.*', function(done) {
    runner
      .chdir('flags/sortTasks/t')
      .gulp('--tasks')
      .run(cb);

    function cb(err, stdout, stderr) {
      var filepath = path.join(expectedDir, 'flags-tasks-sorted.txt');
      var expected = fs.readFileSync(filepath, 'utf-8');
      stdout = eraseTime(skipLines(stdout, 1));

      expect(stdout).toEqual(expected);
      expect(stderr).toEqual('');
      done(err);
    }
  });

  // This test fails because the cwd gets changed to `gulp-cli/test/fixtures/gulpfiles`
  // but the .gulp.* file in that directory doesn't get resolved
  it.skip('Should sort top tasks in task list when `flags.sortTasks` is false in .gulp.*', function(done) {
    runner
      .chdir('flags/sortTasks/f')
      .gulp('--tasks')
      .run(cb);

    function cb(err, stdout, stderr) {
      var filepath = path.join(expectedDir, 'flags-tasks-unsorted.txt');
      var expected = fs.readFileSync(filepath, 'utf-8');
      stdout = eraseTime(skipLines(stdout, 1));

      expect(stdout).toEqual(expected);
      expect(stderr).toEqual('');
      done(err);
    }
  });

  // This test fails because the cwd gets changed to `gulp-cli/test/fixtures/gulpfiles`
  // but the .gulp.* file in that directory doesn't get resolved
  it.skip('Should overridden by cli flag: --sort-tasks', function(done) {
    runner
      .chdir('flags/sortTasks/f')
      .gulp('--tasks --sort-tasks')
      .run(cb);

    function cb(err, stdout, stderr) {
      var filepath = path.join(expectedDir, 'flags-tasks-sorted.txt');
      var expected = fs.readFileSync(filepath, 'utf-8');
      stdout = eraseTime(skipLines(stdout, 1));

      expect(stdout).toEqual(expected);
      expect(stderr).toEqual('');
      done(err);
    }
  });

  // This test fails because the cwd gets changed to `gulp-cli/test/fixtures/gulpfiles`
  // but the .gulp.* file in that directory doesn't get resolved
  it.skip('Should overridden by cli flag: --no-sort-tasks', function(done) {
    runner
      .chdir('flags/sortTasks/t')
      .gulp('--tasks --no-sort-tasks')
      .run(cb);

    function cb(err, stdout, stderr) {
      var filepath = path.join(expectedDir, 'flags-tasks-unsorted.txt');
      var expected = fs.readFileSync(filepath, 'utf-8');
      stdout = eraseTime(skipLines(stdout, 1));

      expect(stdout).toEqual(expected);
      expect(stderr).toEqual('');
      done(err);
    }
  });

});
