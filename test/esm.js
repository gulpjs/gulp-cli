'use strict';

var expect = require('expect');
var fs = require('fs');
var path = require('path');
var semver = require('semver');
var skipLines = require('gulp-test-tools').skipLines;
var eraseTime = require('gulp-test-tools').eraseTime;
var runner = require('gulp-test-tools').gulpRunner;

var expectedDir = path.join(__dirname, 'expected');

if (semver.gte(process.version, '10.15.3')) {

  describe('ESM', function() {

    it('prints the task list', function(done) {
      var options = '--tasks --sort-tasks ' +
        '--gulpfile ./test/fixtures/gulpfiles/gulpfile.mjs';
      var trailingLines = 1;
      if (!semver.satisfies(process.version, '^12.17.0 || >=13.2.0')) {
        options += ' --experimental-modules';
        trailingLines += 2;
      }

      runner({ verbose: false }).gulp(options).run(cb);

      function cb(err, stdout, stderr) {
        expect(err).toEqual(null);
        expect(stderr).toMatch(/^(.*ExperimentalWarning: The ESM module loader is experimental\.\n)?$/);
        var filepath = path.join(expectedDir, 'esm.txt');
        var expected = fs.readFileSync(filepath, 'utf-8');
        stdout = eraseTime(skipLines(stdout, trailingLines));
        expect(stdout).toEqual(expected);
        done(err);
      }
    });

  });

}
