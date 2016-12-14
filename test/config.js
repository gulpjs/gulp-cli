'use strict';

var lab = exports.lab = require('lab').script();
var expect = require('code').expect;
var path = require('path');
var fs = require('fs');

var skipLines = require('gulp-test-tools').skipLines;
var eraseTime = require('gulp-test-tools').eraseTime;
var runner = require('gulp-test-tools').gulpRunner;

var fixturesDir = path.join(__dirname, 'fixtures', 'config');
var expectedDir = path.join(__dirname, 'expected', 'config');

lab.experiment('gulp configuration', function() {

  lab.test('Should configure with a .gulp.* file in cwd',
  function(done) {
    runner({ verbose: false })
      .basedir(fixturesDir)
      .chdir('foo/bar')
      .gulp('--tasks')
      .run(cb);

    function cb(err, stdout) {
      var expected = fs.readFileSync(path.join(expectedDir, 'output0.txt'),
        'utf-8');
      stdout = eraseTime(stdout);
      expect(stdout).to.equal(expected);
      done(err);
    }
  });

  lab.test('Should configure with a .gulp.* file in cwd found up',
  function(done) {
    runner({ verbose: false })
      .basedir(fixturesDir)
      .chdir('foo/bar/baz')
      .gulp('--tasks')
      .run(cb);

    function cb(err, stdout) {
      var expected = fs.readFileSync(path.join(expectedDir, 'output0.txt'),
        'utf-8');
      stdout = eraseTime(skipLines(stdout, 1));
      expect(stdout).to.equal(expected);
      done(err);
    }
  });

  lab.test('Should configure with a .gulp.* file in cwd by --cwd',
  function(done) {
    runner({ verbose: false })
      .basedir(fixturesDir)
      .chdir('qux')
      .gulp('--tasks', '--gulpfile ../foo/bar/gulpfile.js', '--cwd .')
      .run(cb);

    function cb(err, stdout) {
      var expected = fs.readFileSync(path.join(expectedDir, 'output1.txt'),
        'utf-8');
      stdout = eraseTime(stdout);
      expect(stdout).to.equal(expected);
      done(err);
    }
  });
});
