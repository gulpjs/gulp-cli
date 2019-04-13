'use strict';

var expect = require('expect');
var fs = require('fs');
var path = require('path');
var rimraf = require('rimraf');
var skipLines = require('gulp-test-tools').skipLines;
var runner = require('gulp-test-tools').gulpRunner;

var expected = require(path.join(__dirname, 'expected/flags-tasks-json.json'));

describe('flag: --tasks-json', function() {

  it('prints the task list with no args', function(done) {
    runner({ verbose: false })
      .gulp('--tasks-json --gulpfile ./test/fixtures/gulpfiles/gulpfile.js')
      .run(cb);

    function cb(err, stdout, stderr) {
      expect(err).toEqual(null);
      expect(stderr).toEqual('');
      expect(JSON.parse(stdout)).toEqual(expected);
      done(err);
    }
  });

  it('prints the task list with the default description', function(done) {
    var cwdPath = __dirname;
    var gulpfilePath = path.join(__dirname, 'fixtures/gulpfiles/gulpfile.js');
    runner({ verbose: false })
      .gulp('--tasks-json',
            '--cwd ', cwdPath,
            '--gulpfile ', gulpfilePath)
      .run(cb);

    function cb(err, stdout, stderr) {
      expect(err).toEqual(null);
      expect(stderr).toEqual('');
      var jsonObj = JSON.parse(stdout);
      expect(jsonObj.label).toMatch('Tasks for ');
      expect(jsonObj.nodes).toEqual(expected.nodes);
      done(err);
    }
  });

  it('writes the task list to file with path', function(done) {
    var output = path.join(__dirname, '/output/');
    rimraf.sync(output);
    fs.mkdirSync(output);

    runner({ verbose: false })
      .gulp('--tasks-json ../../output/tasks.json',
        '--gulpfile ./test/fixtures/gulpfiles/gulpfile.js')
      .run(cb);

    function cb(err, stdout, stderr) {
      expect(err).toEqual(null);
      expect(stderr).toEqual('');
      stdout = skipLines(stdout, 1);
      expect(stdout).toEqual('');
      var file = fs.readFileSync(path.join(output, '/tasks.json'), 'utf8');
      var parsedJson = JSON.parse(file);
      expect(parsedJson).toEqual(expected);
      rimraf.sync(output);
      done(err);
    }
  });

  it('avoids printing "Requiring external module *"', function(done) {
    // Disable the timeout for old node versions
    this.timeout(0);

    runner({ verbose: false })
      .gulp('--tasks-json --gulpfile ./test/fixtures/gulpfiles/gulpfile-babel.babel.js')
      .run(cb);

    function cb(err, stdout, stderr) {
      expect(err).toEqual(null);
      expect(stderr).toEqual('');
      expect(JSON.parse(stdout)).toEqual(expected);
      done(err);
    }
  });
});
