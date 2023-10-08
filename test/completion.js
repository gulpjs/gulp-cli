'use strict';

var expect = require('expect');
var exec = require('child_process').exec;
var path = require('path');
var fs = require('fs');

var gulp = require('./tool/gulp-cmd').gulp;

describe('flag: --completion', function() {

  ['bash', 'fish', 'powershell', 'zsh'].forEach(function(type) {
    it('returns completion script for ' + type, function(done) {
      var file = path.resolve(__dirname, '../completion', type);
      var expected = fs.readFileSync(file, 'utf8') + '\n';

      exec(gulp('--completion=' + type), cb);

      function cb(err, stdout, stderr) {
        expect(err).toBeNull();
        expect(stderr).toEqual('');
        expect(stdout).toEqual(expected);
        done(err);
      }
    });
  });

  it('shows error message for unknown completion type', function(done) {
    var expected = 'echo "gulp autocompletion rules for \'unknown\' not found"\n';

    exec(gulp('--completion=unknown'), cb);

    function cb(err, stdout, stderr) {
      expect(err).not.toBeNull();
      expect(stderr).toEqual('');
      expect(stdout).toEqual(expected);
      done();
    }
  });

  it('shows error message for missing completion type', function(done) {
    exec(gulp('--completion'), cb);

    function cb(err, stdout, stderr) {
      expect(err).not.toBeNull();
      expect(stderr).toMatch('Missing completion type');
      expect(stdout).toEqual('');
      done();
    }
  });

});
