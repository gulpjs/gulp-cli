'use strict';

var expect = require('expect');
var exec = require('child_process').exec;
var path = require('path');

var cd = require('./tool/gulp-cmd').cd;

var baseDir = path.join(__dirname, '..');

describe('flag: --silent', function() {

  it('prints nothing when silent flag is set', function(done) {
    exec(cd(baseDir).gulp(
      '--silent',
      '--cwd ./test/fixtures/gulpfiles'
    ), cb);

    function cb(err, stdout, stderr) {
      expect(err).toBeNull();
      expect(stderr).toEqual('');
      expect(stdout).toEqual('');
      done(err);
    }
  });

});
