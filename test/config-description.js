'use strict';

var expect = require('expect');
var exec = require('child_process').exec;
var path = require('path');
var fs = require('fs');

var sliceLines = require('./tool/slice-lines');
var eraseTime = require('./tool/erase-time');
var cd = require('./tool/gulp-cmd').cd;

var baseDir = path.join(__dirname, 'fixtures', 'config');
var expectedDir = path.join(__dirname, 'expected', 'config');

describe('config: description', function() {

  it('Should configure with a .gulp.* file in cwd', function(done) {
    exec(cd(baseDir, 'foo/bar').gulp('--tasks'), cb);

    function cb(err, stdout, stderr) {
      expect(err).toBeNull();
      expect(stderr).toEqual('');
      var expected = fs.readFileSync(path.join(expectedDir, 'output0.txt'), 'utf-8');
      expect(eraseTime(stdout)).toEqual(expected);
      done(err);
    }
  });

  it('Should configure with a .gulp.* file in cwd found up', function(done) {
    exec(cd(baseDir, 'foo/bar/baz').gulp('--tasks'), cb);

    function cb(err, stdout, stderr) {
      expect(err).toBeNull();
      expect(stderr).toEqual('');
      var expected = fs.readFileSync(path.join(expectedDir, 'output0.txt'), 'utf-8');
      expect(sliceLines(stdout, 1)).toEqual(expected);
      done(err);
    }
  });

  it('Should configure with a .gulp.* file in cwd even if it is not a project root', function(done) {
    exec(cd(baseDir, 'foo/bar/quux').gulp('--tasks'), cb);

    function cb(err, stdout, stderr) {
      expect(err).toBeNull();
      expect(stderr).toEqual('');
      var expected = fs.readFileSync(path.join(expectedDir, 'output2.txt'), 'utf-8');
      expect(sliceLines(stdout, 1)).toEqual(expected);
      done(err);
    }
  });

  it('Should configure with a .gulp.* file in cwd by --cwd', function(done) {
    exec(cd(baseDir, 'qux').gulp(
      '--tasks',
      '--gulpfile ../foo/bar/gulpfile.js',
      '--cwd .'
    ), cb);

    function cb(err, stdout, stderr) {
      expect(err).toBeNull();
      expect(stderr).toEqual('');
      var expected = fs.readFileSync(path.join(expectedDir, 'output1.txt'), 'utf-8');
      expect(eraseTime(stdout)).toEqual(expected);
      done(err);
    }
  });
});
