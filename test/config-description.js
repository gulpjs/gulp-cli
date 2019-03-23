'use strict';

var expect = require('expect');
var path = require('path');
var fs = require('fs');

var skipLines = require('gulp-test-tools').skipLines;
var eraseTime = require('gulp-test-tools').eraseTime;
var runner = require('gulp-test-tools').gulpRunner;

var fixturesDir = path.join(__dirname, 'fixtures', 'config', 'description');
var expectedDir = path.join(__dirname, 'expected', 'config');

describe('config: description', function() {

  it('Should configure with a .gulp.* file in cwd', function(done) {
    runner({ verbose: false })
      .basedir(fixturesDir)
      .chdir('cwd')
      .gulp('--tasks')
      .run(cb);

    function cb(err, stdout, stderr) {
      expect(err).toEqual(null);
      expect(stderr).toEqual('');
      var expected = fs.readFileSync(path.join(expectedDir, 'output0.txt'), 'utf-8');
      stdout = eraseTime(stdout);
      expect(stdout).toEqual(expected);
      done(err);
    }
  });

  it('Should configure with a .gulp.* file in initial cwd', function(done) {
    runner({ verbose: false })
      .basedir(fixturesDir)
      .chdir('initcwd/currentdir')
      .gulp('--tasks')
      .run(cb);

    function cb(err, stdout, stderr) {
      expect(err).toEqual(null);
      expect(stderr).toEqual('');
      var expected = fs.readFileSync(path.join(expectedDir, 'output2.txt'), 'utf-8');
      stdout = eraseTime(skipLines(stdout, 1));
      expect(stdout).toEqual(expected);
      done(err);
    }
  });

  it('Should configure with a .gulp.* file in cwd found up', function(done) {
    runner({ verbose: false })
      .basedir(fixturesDir)
      .chdir('findup/currentdir')
      .gulp('--tasks')
      .run(cb);

    function cb(err, stdout, stderr) {
      expect(err).toEqual(null);
      expect(stderr).toEqual('');
      var expected = fs.readFileSync(path.join(expectedDir, 'output1.txt'), 'utf-8');
      stdout = eraseTime(skipLines(stdout, 1));
      expect(stdout).toEqual(expected);
      done(err);
    }
  });

  it('Should configure with a .gulp.* file in cwd by --cwd', function(done) {
    runner({ verbose: false })
      .basedir(fixturesDir)
      .chdir('findup/currentdir')
      .gulp('--tasks', '--cwd ../../cwd')
      .run(cb);

    function cb(err, stdout, stderr) {
      expect(err).toEqual(null);
      expect(stderr).toEqual('');
      var expected = fs.readFileSync(path.join(expectedDir, 'output0.txt'), 'utf-8');
      stdout = skipLines(eraseTime(stdout), 1);
      expect(stdout).toEqual(expected);
      done(err);
    }
  });

  it('Should configure with a .gulp.* file having renamed gulpfile', function(done) {
    runner({ verbose: false })
      .basedir(fixturesDir)
      .chdir('initcwd/renamedgulpfile')
      .gulp('--tasks')
      .run(cb);

    function cb(err, stdout, stderr) {
      expect(err).toEqual(null);
      expect(stderr).toEqual('');
      var expected = fs.readFileSync(path.join(expectedDir, 'output3.txt'), 'utf-8');
      stdout = skipLines(eraseTime(stdout), 1);
      expect(stdout).toEqual(expected);
      done(err);
    }
  });

  it('Should give priority to .gulp.* in cwd higher than .gulp.* in initial cwd', function(done) {
    runner({ verbose: false })
      .basedir(fixturesDir)
      .chdir('initcwd/renamedgulpfile')
      .gulp('--tasks --cwd ../../cwd')
      .run(cb);

    function cb(err, stdout, stderr) {
      expect(err).toEqual(null);
      expect(stderr).toEqual('');
      var expected = fs.readFileSync(path.join(expectedDir, 'output3.txt'), 'utf-8');
      stdout = skipLines(eraseTime(stdout), 1);

      expect(stdout).toEqual(expected);
      done(err);
    }
  });

});
