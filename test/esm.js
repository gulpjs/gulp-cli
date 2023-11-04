'use strict';

var expect = require('expect');
var exec = require('child_process').exec;
var fs = require('fs');
var path = require('path');
var semver = require('semver');
var os = require('os');

var baseDir = path.join(__dirname, '..');
var sliceLines = require('./tool/slice-lines');
var cd = require('./tool/gulp-cmd').cd;

var expectedDir = path.join(__dirname, 'expected');

function shouldSkip() {
  switch (os.platform()) {
    case 'win32': {
      return semver.satisfies(process.version, '^11.2.0') ||
        (process.env.CI && semver.satisfies(process.version, '10.x.x'));
    }
    case 'darwin': {
      return semver.satisfies(process.version, '>=11.0.0 <11.11.0');
    }
    case 'linux': {
      return semver.satisfies(process.version, '>=11.2.0 <11.4.0');
    }
  }
  return semver.satisfies(process.version, '12.8.x || >=12.11.0 <12.18.0 || >=13.0.0 <13.8.0');
}

describe('ESM', function() {

  it('prints the task list', function(done) {
    if (shouldSkip()) {
      this.skip();
    }

    var options = '--tasks --sort-tasks --gulpfile ./test/fixtures/gulpfiles/gulpfile.mjs';
    var trailingLines = 1;
    if (!semver.satisfies(process.version, '^12.17.0 || >=13.2.0')) {
      options += ' --experimental-modules';
      trailingLines += 2;
    }

    exec(cd(baseDir).gulp(options), cb);

    function cb(err, stdout, stderr) {
      expect(err).toBeNull();
      if (!semver.satisfies(process.version, '^12.20.0 || >=13.14.0')) {
        expect(stderr).toMatch('ExperimentalWarning: The ESM module loader is experimental.\n');
      } else {
        expect(stderr).toEqual('');
      }
      var filepath = path.join(expectedDir, 'esm.txt');
      var expected = fs.readFileSync(filepath, 'utf-8');
      expect(sliceLines(stdout, trailingLines)).toEqual(expected);
      done(err);
    }
  });

});
