'use strict';

var expect = require('expect');
var fs = require('fs-extra');
var path = require('path');
var skipLines = require('gulp-test-tools').skipLines;
var runner = require('gulp-test-tools').gulpRunner;

var expected = require(path.join(__dirname, 'expected/flags-tasks-json.json'));

describe('flag: --tasks-json', function() {

  it('prints the task list with no args', function(done) {
    runner({ verbose: false })
      .gulp('--tasks-json --gulpfile ./test/fixtures/gulpfiles/gulpfile.js')
      .run(cb);

    function cb(err, stdout) {
      stdout = skipLines(stdout, 1);
      expect(JSON.parse(stdout)).toEqual(expected);
      done();
    }
  });

  it('writes the task list to file with path', function(done) {
    fs.emptyDir(__dirname + '/output/', function(err) {
      if (err) {
        return done(err);
      }

      runner({ verbose: false })
        .gulp('--tasks-json ../../output/tasks.json',
          '--gulpfile ./test/fixtures/gulpfiles/gulpfile.js')
        .run(cb);

      function cb(err) {
        var file = fs.readFileSync(__dirname + '/output/tasks.json', 'utf8');
        var parsedJson = JSON.parse(file);
        expect(parsedJson).toEqual(expected);
        fs.removeSync(__dirname + '/output/');
        done(err);
      }
    });
  });

});
