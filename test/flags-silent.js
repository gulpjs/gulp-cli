'use strict';

var expect = require('expect');
var exec = require('child_process').exec;
var path = require('path');

var cmdSep = require('./tool/cmd-sep');

var gulpCmd = 'node ' + path.join(__dirname, '../bin/gulp.js');
var baseDir = path.join(__dirname, '..');

describe('flag: --silent', function() {

  it('prints nothing when silent flag is set', function(done) {
    exec([
      'cd ' + baseDir + cmdSep,
      gulpCmd,
      '--silent',
      '--cwd ./test/fixtures/gulpfiles',
    ].join(' '), cb);

    function cb(err, stdout, stderr) {
      expect(err).toEqual(null);
      expect(stderr).toEqual('');
      expect(stdout).toEqual('');
      done(err);
    }
  });

});
