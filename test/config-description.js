'use strict';

var expect = require('expect');
var path = require('path');
var fs = require('fs');

var skipLines = require('gulp-test-tools').skipLines;
var eraseTime = require('gulp-test-tools').eraseTime;
var runner = require('gulp-test-tools').gulpRunner;
var stripAnsi = require('../lib/shared/ansi').strip;

var fixturesDir = path.join(__dirname, 'fixtures', 'config');
var expectedDir = path.join(__dirname, 'expected', 'config');

describe('config: description', function() {

  it('Should configure with a .gulp.* file in cwd', function(done) {
    runner({ verbose: false })
      .basedir(fixturesDir)
      .chdir('foo/bar')
      .gulp('--tasks')
      .run(cb);

    function cb(err, stdout, stderr) {
      expect(err).toEqual(null);
      expect(stderr).toEqual('');
      var expected = fs.readFileSync(path.join(expectedDir, 'output0.txt'),
        'utf-8');
      stdout = eraseTime(stripAnsi(stdout));
      expect(stdout).toEqual(expected);
      done(err);
    }
  });

  it('Should configure with a .gulp.* file in cwd found up', function(done) {
    runner({ verbose: false })
      .basedir(fixturesDir)
      .chdir('foo/bar/baz')
      .gulp('--tasks')
      .run(cb);

    function cb(err, stdout, stderr) {
      expect(err).toEqual(null);
      expect(stderr).toEqual('');
      var expected = fs.readFileSync(path.join(expectedDir, 'output0.txt'),
        'utf-8');
      stdout = eraseTime(stripAnsi(skipLines(stdout, 1)));
      expect(stdout).toEqual(expected);
      done(err);
    }
  });

  it('Should configure with a .gulp.* file in cwd by --cwd', function(done) {
    runner({ verbose: false })
      .basedir(fixturesDir)
      .chdir('qux')
      .gulp('--tasks', '--gulpfile ../foo/bar/gulpfile.js', '--cwd .')
      .run(cb);

    function cb(err, stdout, stderr) {
      expect(err).toEqual(null);
      expect(stderr).toEqual('');
      var expected = fs.readFileSync(path.join(expectedDir, 'output1.txt'),
        'utf-8');
      stdout = eraseTime(stripAnsi(stdout));
      expect(stdout).toEqual(expected);
      done(err);
    }
  });
});
