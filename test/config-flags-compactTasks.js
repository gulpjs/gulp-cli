'use strict';

var expect = require('expect');
var path = require('path');
var fs = require('fs');
var skipLines = require('gulp-test-tools').skipLines;
var eraseTime = require('gulp-test-tools').eraseTime;

var fixturesDir = path.join(__dirname, 'fixtures/config');
var expectedDir = path.join(__dirname, 'expected');
var runner = require('gulp-test-tools').gulpRunner().basedir(fixturesDir);

describe('config: flags.compactTasks', function() {

  // This test fails because the cwd gets changed to `gulp-cli/test/fixtures/gulpfiles`
  // but the .gulp.* file in that directory doesn't get resolved
  it.skip('Should compact task lists when `flags.compactTasks` is true in .gulp.*', function(done) {
    runner
      .chdir('flags/compactTasks/t')
      .gulp('--tasks')
      .run(cb);

    function cb(err, stdout, stderr) {
      var filepath = path.join(expectedDir, 'flags-tasks-compact.txt');
      var expected = fs.readFileSync(filepath, 'utf-8');
      stdout = eraseTime(skipLines(stdout, 1));

      expect(stdout).toEqual(expected);
      expect(stderr).toEqual('');
      done(err);
    }
  });

  // This test fails because the cwd gets changed to `gulp-cli/test/fixtures/gulpfiles`
  // but the .gulp.* file in that directory doesn't get resolved
  it.skip('Should not compact task lists when `flags.compactTasks` is false in .gulp.*', function(done) {
    runner
      .chdir('flags/compactTasks/f')
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
  it.skip('Should overridden by cli flag: --compact-tasks', function(done) {
    runner
      .chdir('flags/compactTasks/f')
      .gulp('--tasks --compact-tasks')
      .run(cb);

    function cb(err, stdout, stderr) {
      var filepath = path.join(expectedDir, 'flags-tasks-compact.txt');
      var expected = fs.readFileSync(filepath, 'utf-8');
      stdout = eraseTime(skipLines(stdout, 1));

      expect(stdout).toEqual(expected);
      expect(stderr).toEqual('');
      done(err);
    }
  });

  // This test fails because the cwd gets changed to `gulp-cli/test/fixtures/gulpfiles`
  // but the .gulp.* file in that directory doesn't get resolved
  it.skip('Should overridden by cli flag: --no-compact-tasks', function(done) {
    runner
      .chdir('flags/compactTasks/t')
      .gulp('--tasks --no-compact-tasks')
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
