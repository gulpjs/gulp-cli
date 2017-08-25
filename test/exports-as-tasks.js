'use strict';

var expect = require('expect');
var fs = require('fs');
var path = require('path');
var skipLines = require('gulp-test-tools').skipLines;
var eraseTime = require('gulp-test-tools').eraseTime;
var runner = require('gulp-test-tools').gulpRunner;
var stripAnsi = require('../lib/shared/ansi').strip;

var expectedDir = path.join(__dirname, 'expected');

// Long timeout is required because parse time is slow
describe('exports as tasks', function() {
  this.timeout(0);

  it('prints the task list', function(done) {
    runner({ verbose: false })
      .gulp('--tasks', '--sort-tasks',
        '--gulpfile ./test/fixtures/gulpfiles/gulpfile-exports.babel.js')
      .run(cb);

    function cb(err, stdout, stderr) {
      expect(err).toEqual(null);
      expect(stderr).toEqual('');
      var filepath = path.join(expectedDir, 'tasks-as-exports.txt');
      var expected = fs.readFileSync(filepath, 'utf-8');
      stdout = eraseTime(stripAnsi(skipLines(stdout, 2)));
      expect(stdout).toEqual(expected);
      done(err);
    }
  });

});
