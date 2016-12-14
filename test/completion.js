'use strict';

var lab = exports.lab = require('lab').script();
var expect = require('code').expect;
var runner = require('gulp-test-tools').gulpRunner;

lab.experiment('flag: --completion', function() {

  ['bash', 'fish', 'powershell', 'zsh'].forEach(function(type) {
    lab.test('returns completion script for ' + type, function(done) {
      runner({ verbose: false })
        .gulp('--completion=' + type)
        .run(cb);

      function cb(err, stdout) {
        expect(stdout).to.contain('gulp --completion=' + type);
        done(err);
      }
    });
  });

  lab.test('shows error message for unknown completion type', function(done) {
    runner({ verbose: false })
      .gulp('--completion=unknown')
      .run(cb);

    function cb(err, stdout) {
      expect(stdout).to.contain('rules for \'unknown\' not found');
      done();
    }
  });

});
