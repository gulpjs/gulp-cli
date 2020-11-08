'use strict';

var expect = require('expect');
var path = require('path');

var skipLines = require('gulp-test-tools').skipLines;
var runner = require('gulp-test-tools').gulpRunner;

var fixturesDir = path.join(__dirname, 'fixtures', 'config', 'falsy');

describe('config: falsy logs', function() {

  it('Should output no error line.', function(done) {
    runner({ verbose: false })
      .basedir(fixturesDir)
      .gulp('--gulpfile', 'no-gulpfile')
      .run(cb);

    function cb(err, stdout, stderr) {
      expect(err).toNotEqual(null);
      expect(stderr).toEqual('');
      expect(stdout).toEqual('');
      done();
    }
  });

  it('Should output no info line', function(done) {
    runner({ verbose: false })
      .basedir(fixturesDir)
      .gulp()
      .run(cb);

    function cb(err, stdout, stderr) {
      expect(err).toEqual(null);
      expect(stderr).toEqual('');
      expect(skipLines(stdout, 1)).toEqual(
        'Stop clean\n' +
        'Stop build\n' +
        'Stop default\n' +
      '');
      done(err);
    }
  });
});
