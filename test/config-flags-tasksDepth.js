'use strict';

var expect = require('expect');
var path = require('path');
var fs = require('fs');
var skipLines = require('gulp-test-tools').skipLines;
var eraseTime = require('gulp-test-tools').eraseTime;
var stripAnsi = require('./shared/stripAnsi');

var fixturesDir = path.join(__dirname, 'fixtures/config');
var expectedDir = path.join(__dirname, 'expected');
var runner = require('gulp-test-tools').gulpRunner().basedir(fixturesDir);

describe ('config: flags.tasksDepth', function() {

  it('Should limit depth of task list when `flags.tasksDepth` is ' +
  'specified', function(done) {
    runner
      .chdir('flags/tasksDepth')
      .gulp('--tasks')
      .run(cb);

    function cb(err, stdout, stderr) {
      var filepath = path.join(expectedDir, 'flags-tasks-depth4.txt');
      var expected = fs.readFileSync(filepath, 'utf-8');
      expected = skipLines(expected, 1);

      stdout = eraseTime(stripAnsi(skipLines(stdout, 1)));

      expect(stdout).toEqual(expected);
      expect(stderr).toEqual('');
      done(err);
    }
  });

});
