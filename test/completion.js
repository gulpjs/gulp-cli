'use strict';

var lab = exports.lab = require('lab').script();
var code = require('code');

var child = require('child_process');

lab.experiment('flag: --completion', function() {

  ['bash', 'fish', 'powershell', 'zsh'].forEach(function(type) {
    lab.test('returns completion script for ' + type, function(done) {
      child.exec('node ' + __dirname + '/../bin/gulp.js --completion=' + type, function(err, stdout) {
        code.expect(stdout).to.contain('gulp --completion=' + type);
        done(err);
      });
    });
  });

  lab.test('shows error message for unknown completion type', function(done) {
    child.exec('node ' + __dirname + '/../bin/gulp.js --completion=unknown', function(err, stdout) {
      code.expect(stdout).to.contain('rules for \'unknown\' not found');
      done();
    });
  });

});
