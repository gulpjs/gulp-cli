'use strict';

var expect = require('expect');
var path = require('path');
var fs = require('fs');
var skipLines = require('gulp-test-tools').skipLines;
var eraseTime = require('gulp-test-tools').eraseTime;

var fixturesDir = path.join(__dirname, 'fixtures/config');
var expectedDir = path.join(__dirname, 'expected');
var runner = require('gulp-test-tools')
  .gulpRunner()
  .basedir(fixturesDir);

describe('config: flags.compactTasks', function() {
  it('Should compact task lists when `flags.compactTasks` is true in .gulp.*', function(done) {
    runner
      .chdir('flags/compactTasks/t')
      .gulp('--tasks')
      .run(cb);

    function cb(err, stdout, stderr) {
      var filepath = path.join(expectedDir, 'flags-tasks-compact.txt');
      var expected = fs.readFileSync(filepath, 'utf-8');
      expected = skipLines(expected, 1);

      stdout = eraseTime(skipLines(stdout, 1));

      expect(stdout).toEqual(expected);
      expect(stderr).toEqual('');
      done(err);
    }
  });

  it('Should not compact task lists when `flags.compactTasks` is false in ' + '.gulp.*', function(done) {
    runner
      .chdir('flags/compactTasks/f')
      .gulp('--tasks')
      .run(cb);

    function cb(err, stdout, stderr) {
      var filepath = path.join(expectedDir, 'flags-tasks-unsorted.txt');
      var expected = fs.readFileSync(filepath, 'utf-8');
      expected = skipLines(expected, 1);

      stdout = eraseTime(skipLines(stdout, 1));

      expect(stdout).toEqual(expected);
      expect(stderr).toEqual('');
      done(err);
    }
  });
});
