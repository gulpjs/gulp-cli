'use strict';

var expect = require('expect');
var exec = require('child_process').exec;
var fs = require('fs');
var path = require('path');
var semver = require('semver');

var baseDir = path.join(__dirname, '..');
var sliceLines = require('./tool/slice-lines');
var cmdSep = require('./tool/cmd-sep');

var gulpCmd = 'node ' + path.join(__dirname, '../bin/gulp.js');
var expectedDir = path.join(__dirname, 'expected');

describe('ESM', function() {

  it('prints the task list', function(done) {
    if (semver.lt(process.version, '10.15.3')) {
      this.skip();
    }

    var options = '--tasks --sort-tasks --gulpfile ./test/fixtures/gulpfiles/gulpfile.mjs';
    var trailingLines = 1;
    if (!semver.satisfies(process.version, '^12.17.0 || >=13.2.0')) {
      options += ' --experimental-modules';
      trailingLines += 2;
    }

    exec([
      'cd ' + baseDir + cmdSep,
      gulpCmd,
      options,
    ].join(' '), cb);

    function cb(err, stdout, stderr) {
      expect(err).toEqual(null);
      expect(stderr).toMatch(/^(.*ExperimentalWarning: The ESM module loader is experimental\.\n)?$/);
      var filepath = path.join(expectedDir, 'esm.txt');
      var expected = fs.readFileSync(filepath, 'utf-8');
      expect(sliceLines(stdout, trailingLines)).toEqual(expected);
      done(err);
    }
  });

});
