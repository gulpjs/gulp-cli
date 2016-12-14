'use strict';

var lab = exports.lab = require('lab').script();
var expect = require('code').expect;
var runner = require('gulp-test-tools').gulpRunner;
var path = require('path');
var fs = require('fs');

var outputFile = path.join(__dirname, 'expected/flags-tasks-simple.txt');
var outputText = fs.readFileSync(outputFile, 'utf8');

lab.experiment('flag: --tasks-simple', function() {

  lab.test('prints the task list in simple format', function(done) {
    runner({ verbose: false })
      .gulp('--tasks-simple', '--cwd ./test/fixtures/gulpfiles')
      .run(cb);

    function cb(err, stdout) {
      expect(stdout).to.equal(outputText);
      done(err);
    }
  });

});
