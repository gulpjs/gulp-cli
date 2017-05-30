'use strict';

var expect = require('expect');
var runner = require('gulp-test-tools').gulpRunner;
var path = require('path');
var fs = require('fs');

var outputFile = path.join(__dirname, 'expected/flags-tasks-simple.txt');
var outputText = fs.readFileSync(outputFile, 'utf8');

describe('flag: --tasks-simple', function() {

  it('prints the task list in simple format', function(done) {
    runner({ verbose: false })
      .gulp('--tasks-simple', '--cwd ./test/fixtures/gulpfiles')
      .run(cb);

    function cb(err, stdout, stderr) {
      expect(err).toEqual(null);
      expect(stderr).toEqual('');
      expect(stdout).toEqual(outputText);
      done(err);
    }
  });

});
