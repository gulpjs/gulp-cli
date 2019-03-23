'use strict';

var expect = require('expect');
var path = require('path');

var runner = require('gulp-test-tools').gulpRunner;
var headLines = require('gulp-test-tools').headLines;
var eraseTime = require('gulp-test-tools').eraseTime;

describe('flags: v8flags', function() {

  it('Should respawn by a v8flag: --lazy', function(done) {
    runner({ verbose: false })
      .chdir(path.join(__dirname, 'fixtures/gulpfiles'))
      .gulp('--lazy')
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

  it('Should respawn by v8flags: --lazy --harmony', function(done) {
    runner({ verbose: false })
      .chdir(path.join(__dirname, 'fixtures/gulpfiles'))
      .gulp('--lazy --harmony')
      .run(cb);

    function cb(err, stdout, stderr) {
      expect(err).toEqual(null);
      expect(stderr).toEqual('');

      var line = eraseTime(headLines(stdout, 1));
      expect(line).toEqual('Node flags detected: --harmony, --lazy');

      line = eraseTime(headLines(stdout, 2, 1));
      expect(line).toMatch('Respawned to PID: ');
      done(err);
    }
  });
});
