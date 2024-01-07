'use strict';

var expect = require('expect');
var exec = require('child_process').exec;
var path = require('path');

var gulp = require('./tool/gulp-cmd');

var baseDir = path.join(__dirname, '..');

describe('flag: --silent', function() {

  it('prints nothing when silent flag is set', function(done) {
    var opts = { cwd: baseDir };
    exec(gulp(
      '--silent',
      '--cwd ./test/fixtures/gulpfiles'
    ), opts, cb);

    function cb(err, stdout, stderr) {
      expect(err).toBeNull();
      expect(stderr).toEqual('');
      expect(stdout).toEqual('');
      done(err);
    }
  });

});
