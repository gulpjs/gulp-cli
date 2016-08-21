'use strict';

var lab = exports.lab = require('lab').script();
var expect = require('code').expect;
var fs = require('fs');
var path = require('path');
var skipLines = require('./tools/skip-lines');
var eraseTime = require('./tools/erase-time');
var runner = require('./tools/run-gulp');

var expectedDir = path.join(__dirname, 'expected');

// Long timeout is required because parse time is slow
lab.experiment('exports as tasks', { timeout: 0 }, function() {

  lab.test('prints the task list', function(done) {
    runner({ verbose: false })
      .gulp('--tasks',
        '--gulpfile ./fixtures/gulpfiles/gulpfile-exports.babel.js')
      .run(cb);

    function cb(err, stdout) {
      var filepath = path.join(expectedDir, 'tasks-as-exports.txt');
      var expected = fs.readFileSync(filepath, 'utf-8');
      stdout = eraseTime(skipLines(stdout, 2));
      expect(stdout).to.equal(expected);
      done();
    }
  });

});
