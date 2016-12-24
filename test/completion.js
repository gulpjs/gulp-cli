'use strict';

var expect = require('expect');
var runner = require('gulp-test-tools').gulpRunner;

describe('flag: --completion', function() {

  ['bash', 'fish', 'powershell', 'zsh'].forEach(function(type) {
    it('returns completion script for ' + type, function(done) {
      runner({ verbose: false })
        .gulp('--completion=' + type)
        .run(cb);

      function cb(err, stdout) {
        expect(stdout).toMatch('gulp --completion=' + type);
        done(err);
      }
    });
  });

  it('shows error message for unknown completion type', function(done) {
    runner({ verbose: false })
      .gulp('--completion=unknown')
      .run(cb);

    function cb(err, stdout) {
      expect(stdout).toMatch('rules for \'unknown\' not found');
      done();
    }
  });

});
