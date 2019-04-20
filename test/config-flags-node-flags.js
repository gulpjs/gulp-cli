'use strict';

var expect = require('expect');
var path = require('path');

var fixturesDir = path.join(__dirname, 'fixtures/config');

var runner = require('gulp-test-tools').gulpRunner().basedir(fixturesDir);
var headLines = require('gulp-test-tools').headLines;
var skipLines = require('gulp-test-tools').skipLines;
var eraseTime = require('gulp-test-tools').eraseTime;
var eraseLapse = require('gulp-test-tools').eraseLapse;

describe('config: nodeFlags', function() {

  it('Should respawn by a node flag: --lazy', function(done) {
    runner
      .chdir('flags/nodeFlags/string')
      .gulp()
      .run(cb);

    function cb(err, stdout, stderr) {
      expect(err).toEqual(null);
      expect(stderr).toEqual('');

      var line = eraseTime(headLines(stdout, 1));
      expect(line).toEqual('Node flags detected: --lazy');

      line = eraseTime(headLines(stdout, 2, 1));
      expect(line).toMatch('Respawned to PID: ');
      done(err);
    }
  });

  it('Should respawn by a node flag: --lazy --trace-deprecation', function(done) {
    runner
      .chdir('flags/nodeFlags/array')
      .gulp()
      .run(cb);

    function cb(err, stdout, stderr) {
      expect(err).toEqual(null);
      expect(stderr).toEqual('');

      var line = eraseTime(headLines(stdout, 1));
      expect(line).toEqual('Node flags detected: --lazy, --trace-deprecation');

      line = eraseTime(headLines(stdout, 2, 1));
      expect(line).toMatch('Respawned to PID: ');
      done(err);
    }
  });

  it('Should respawn with flags in config file and command line', function(done) {
    runner
      .chdir('flags/nodeFlags/string')
      .gulp('--harmony')
      .run(cb);

    function cb(err, stdout, stderr) {
      expect(err).toEqual(null);
      expect(stderr).toEqual('');

      var line = eraseTime(headLines(stdout, 1));
      expect(line).toEqual('Node flags detected: --lazy, --harmony');

      line = eraseTime(headLines(stdout, 2, 1));
      expect(line).toMatch('Respawned to PID: ');
      done(err);
    }
  });

  it('Should not respawn when a node flag is specified to undefined', function(done) {
    runner
      .chdir('flags/nodeFlags/undefined')
      .gulp()
      .run(cb);

    function cb(err, stdout, stderr) {
      expect(err).toEqual(null);
      expect(stderr).toEqual('');

      stdout = eraseLapse(eraseTime(stdout));
      expect(headLines(stdout, 1)).toMatch('Using gulpfile ');
      expect(skipLines(stdout, 1)).toEqual(
        'Starting \'default\'...\n' +
        'Default\n' +
        'Finished \'default\' after ?\n' +
      '');
      done(err);
    }
  });

  it('Should not respawn when a node flag is specified to null', function(done) {
    runner
      .chdir('flags/nodeFlags/null')
      .gulp()
      .run(cb);

    function cb(err, stdout, stderr) {
      expect(err).toEqual(null);
      expect(stderr).toEqual('');

      stdout = eraseLapse(eraseTime(stdout));
      expect(headLines(stdout, 1)).toMatch('Using gulpfile ');
      expect(skipLines(stdout, 1)).toEqual(
        'Starting \'default\'...\n' +
        'Default\n' +
        'Finished \'default\' after ?\n' +
      '');
      done(err);
    }
  });

});
