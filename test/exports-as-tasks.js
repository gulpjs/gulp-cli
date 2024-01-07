'use strict';

var expect = require('expect');
var exec = require('child_process').exec;
var fs = require('fs');
var path = require('path');

var sliceLines = require('./tool/slice-lines');
var gulp = require('./tool/gulp-cmd');

var baseDir = path.join(__dirname, '..');
var expectedDir = path.join(__dirname, 'expected');

// Long timeout is required because parse time is slow
describe('exports as tasks', function() {
  this.timeout(0);

  it('prints the task list', function(done) {
    var opts = { cwd: baseDir };
    exec(gulp(
      '--tasks',
      '--sort-tasks',
      '--gulpfile', './test/fixtures/gulpfiles/gulpfile-exports.babel.js'
    ), opts, cb);

    function cb(err, stdout, stderr) {
      expect(err).toBeNull();
      expect(stderr).toEqual('');
      var filepath = path.join(expectedDir, 'tasks-as-exports.txt');
      var expected = fs.readFileSync(filepath, 'utf-8');
      // Remove babel/register lines
      expect(sliceLines(stdout, 2)).toEqual(expected);
      done(err);
    }
  });

});
