'use strict';

var lab = exports.lab = require('lab').script();
var expect = require('code').expect;
var fs = require('fs-extra');
var path = require('path');
var skipLines = require('./tools/skip-lines');
var runner = require('./tools/run-gulp');

var expected = require(path.join(__dirname, 'expected/flags-tasks-json.json'));

lab.experiment('flag: --tasks-json', function() {

  lab.test('prints the task list with no args', function(done) {
    runner({ verbose: false })
      .gulp('--tasks-json --gulpfile ./fixtures/gulpfiles/gulpfile.js')
      .run(cb);

    function cb(err, stdout) {
      stdout = skipLines(stdout, 1);
      expect(JSON.parse(stdout)).to.deep.equal(expected);
      done();
    }
  });

  lab.test('writes the task list to file with path', function(done) {
    fs.emptyDir(__dirname + '/output/', function(err) {
      if (err) {
        return done(err);
      }

      runner({ verbose: false })
        .gulp('--tasks-json ../../output/tasks.json',
          '--gulpfile fixtures/gulpfiles/gulpfile.js')
        .run(cb);

      function cb(err) {
        var file = fs.readFileSync(__dirname + '/output/tasks.json', 'utf8');
        var parsedJson = JSON.parse(file);
        expect(parsedJson).to.deep.equal(expected);
        fs.removeSync(__dirname + '/output/');
        done(err);
      }
    });
  });

});
