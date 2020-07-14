'use strict';

var expect = require('expect');
var path = require('path');
var fs = require('fs');
var skipLines = require('gulp-test-tools').skipLines;
var eraseTime = require('gulp-test-tools').eraseTime;

var fixturesDir = path.join(__dirname, 'fixtures/config');
var expectedDir = path.join(__dirname, 'expected');
var runner = require('gulp-test-tools').gulpRunner().basedir(fixturesDir);

describe ('config: flags.tasksDepth', function() {

  // This test fails because the cwd gets changed to `gulp-cli/test/fixtures/gulpfiles`
  // but the .gulp.* file in that directory doesn't get resolved
  it.skip('Should limit depth of task list when `flags.tasksDepth` is specified', function(done) {
    runner
      .chdir('flags/tasksDepth')
      .gulp('--tasks')
      .run(cb);

    function cb(err, stdout, stderr) {
      var filepath = path.join(expectedDir, 'flags-tasks-depth4.txt');
      var expected = fs.readFileSync(filepath, 'utf-8');
      stdout = eraseTime(skipLines(stdout, 1));

      expect(stdout).toEqual(expected);
      expect(stderr).toEqual('');
      done(err);
    }
  });

  // This test fails because the cwd gets changed to `gulp-cli/test/fixtures/gulpfiles`
  // but the .gulp.* file in that directory doesn't get resolved
  it.skip('Should overridden by cli flag: --tasks-depth', function(done) {
    runner
      .chdir('flags/tasksDepth')
      .gulp('--tasks', '--tasks-depth 2')
      .run(cb);

    function cb(err, stdout, stderr) {
      var filepath = path.join(expectedDir, 'flags-tasks-depth2.txt');
      var expected = fs.readFileSync(filepath, 'utf-8');
      stdout = eraseTime(skipLines(stdout, 1));

      expect(stdout).toEqual(expected);
      expect(stderr).toEqual('');
      done(err);
    }
  });
});
