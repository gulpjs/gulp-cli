'use strict';

var lab = exports.lab = require('lab').script();
var expect = require('code').expect;
var fs = require('fs');
var path = require('path');
var skipLines = require('./tools/skip-lines');
var eraseTime = require('./tools/erase-time');
var runner = require('./tools/run-gulp');

var expectedDir = path.join(__dirname, 'expected');

lab.experiment('flag: --tasks', function() {

  lab.test('prints the task list', function(done) {
    runner({ verbose: false })
      .gulp('--tasks --cwd ./fixtures/gulpfiles')
      .run(cb);

    function cb(err, stdout) {
      var filepath = path.join(expectedDir, 'flags-tasks.txt');
      var expected = fs.readFileSync(filepath, 'utf-8');
      stdout = eraseTime(skipLines(stdout, 1));
      expect(stdout).to.equal(expected);
      done();
    }
  });

  lab.test('print the task list with description and flags', function(done) {
    runner({ verbose: false })
      .gulp('--tasks',
        '--gulpfile ./fixtures/gulpfiles/with-desc-and-flags.js',
        '--cwd ./fixtures')
      .run(cb);

    function cb(err, stdout) {
      var filepath = path.join(expectedDir, 'with-desc-and-flags.txt');
      var expected = fs.readFileSync(filepath, 'utf-8');
      stdout = eraseTime(skipLines(stdout, 1));
      expect(stdout).to.equal(expected);
      done();
    }
  });

  lab.test('print the task list by gulp.task(s).unwrap and gulp.task(s)',
  function(done) {
    runner({ verbose: false })
      .gulp('--tasks',
        '--gulpfile ./fixtures/gulpfiles/by-unwrap-and-not-by-unwrap.js',
        '--cwd ./fixtures')
      .run(cb);

    function cb(err, stdout) {
      var filepath = path.join(expectedDir, 'by-unwrap-and-not-by-unwrap.txt');
      var expected = fs.readFileSync(filepath, 'utf-8');
      stdout = eraseTime(skipLines(stdout, 1));
      expect(stdout).to.equal(expected);
      done();
    }
  });

});
