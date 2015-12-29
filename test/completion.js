'use strict';

var lab = exports.lab = require('lab').script();
var code = require('code');

var child = require('child_process');

var fs = require('fs-extra');
var path = require('path');

var outfile = path.resolve(__dirname, 'output/completion.out');

lab.experiment('flag: --completion', function() {

  lab.before(function(done) {
    fs.mkdirpSync(path.resolve(__dirname, 'output'));
    done();
  });

  lab.after(function(done) {
    fs.remove(path.resolve(__dirname, 'output'));
    done();
  });

  ['bash', 'fish', 'powershell', 'zsh'].forEach(function(type) {
    lab.test('returns completion script for ' + type, function(done) {
      child.exec('node ' + __dirname + '/../bin/gulp.js --completion=' + type + ' > ' + outfile, function(err) {
        var stdout = fs.readFileSync(outfile, { encoding: 'utf8' });
        code.expect(stdout).to.contain('gulp --completion=' + type);
        done(err);
      });
    });
  });

  lab.test('shows error message for unknown completion type', function(done) {
    child.exec('node ' + __dirname + '/../bin/gulp.js --completion=unknown > ' + outfile, function() {
      var stdout = fs.readFileSync(outfile, { encoding: 'utf8' });
      code.expect(stdout).to.contain('rules for \'unknown\' not found');
      done();
    });
  });

});
