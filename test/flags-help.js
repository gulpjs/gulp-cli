'use strict';

var lab = exports.lab = require('lab').script();
var expect = require('code').expect;
var runner = require('gulp-test-tools').gulpRunner;

var path = require('path');
var fs = require('fs');

// Erases a first space inserted by `chalk`.
function eraseFirstSpace(s) {
  return s.replace(/^(\r\n|\n|\r)\s?/g, '\n');
}

var outputFile = path.join(__dirname, 'expected/flags-help.txt');
var outputText = fs.readFileSync(outputFile, 'utf8');

lab.experiment('flag: --help', function() {

  lab.test('shows help using --help', function(done) {
    runner({ verbose: false })
      .gulp('--help', '--cwd ./test/fixtures/gulpfiles')
      .run(cb);

    function cb(err, stdout) {
      stdout = eraseFirstSpace(stdout);
      expect(stdout).to.equal(outputText);
      done(err);
    }
  });

  lab.test('shows help using short --h', function(done) {
    runner({ verbose: false })
      .gulp('--h', '--cwd ./test/fixtures/gulpfiles')
      .run(cb);

    function cb(err, stdout) {
      stdout = eraseFirstSpace(stdout);
      expect(stdout).to.equal(outputText);
      done(err);
    }
  });

});
