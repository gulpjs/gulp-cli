'use strict';

var expect = require('expect');
var exec = require('child_process').exec;
var path = require('path');

var sliceLines = require('./tool/slice-lines');
var gulp = require('./tool/gulp-cmd');

var baseDir = path.join(__dirname, 'fixtures/config/flags/gulpfile');

describe('config: flags.gulpfile', function() {

  it('Should configure with a .gulp.* file', function(done) {
    var opts = { cwd: baseDir };
    exec(gulp(), opts, cb);

    function cb(err, stdout, stderr) {
      expect(err).toBeNull();
      expect(stderr).toEqual('');
      expect(sliceLines(stdout, 2, 4)).toEqual(
        'This gulpfile : ' + path.join(baseDir, 'is/here/mygulpfile.js') + '\n' +
        'The current directory : ' + baseDir
      );
      done(err);
    }
  });

  it('Should configure with a .gulp.* file in the directory specified by --cwd', function(done) {
    var opts = { cwd: path.join(__dirname, 'fixtures/config') };
    exec(gulp('--cwd ./flags/gulpfile'), opts, cb);

    function cb(err, stdout, stderr) {
      expect(err).toBeNull();
      expect(stderr).toEqual('');
      expect(sliceLines(stdout, 3, 5)).toEqual(
        'This gulpfile : ' + path.join(baseDir, 'is/here/mygulpfile.js') + '\n' +
        'The current directory : ' + baseDir
      );
      done(err);
    }
  });

  it('Should load a ./gulp.* file in a directory specified by --cwd', function(done) {
    var opts = { cwd: baseDir };
    exec(gulp('--cwd ./cwd'), opts, cb);

    function cb(err, stdout, stderr) {
      expect(err).toBeNull();
      expect(stderr).toEqual('');
      expect(sliceLines(stdout, 3, 4)).toEqual(
        'This gulpfile : ' + path.join(baseDir, 'is/here/mygulpfile.js')
      );
      done(err);
    }
  });

  it('Should ignore a ./.gulp.* file if another gulpfile is specified by --gulpfile', function(done) {
    var opts = { cwd: baseDir };
    exec(gulp('--gulpfile ./cwd/gulpfile.js'), opts, cb);

    function cb(err, stdout, stderr) {
      expect(err).toBeNull();
      expect(stderr).toEqual('');
      expect(sliceLines(stdout, 3, 4)).toEqual(
        'Another gulpfile : ' + path.join(baseDir, 'cwd/gulpfile.js')
      );
      done(err);
    }
  });

  it('Should overridden by cli flag: --gulpfile', function(done) {
    var opts = { cwd: path.join(baseDir, 'override-by-cliflag') };
    exec(gulp('--gulpfile mygulpfile.js'), opts, cb);

    function cb(err, stdout, stderr) {
      expect(err).toBeNull();
      expect(stderr).toEqual('');
      expect(sliceLines(stdout, 2, 3)).toEqual(
        'Gulpfile : ' + path.join(baseDir, 'override-by-cliflag/mygulpfile.js')
      );
      done(err);
    }
  });

  it('Should autoload a module for loading a specified gulpfile', function(done) {
    this.timeout(0);

    var opts = { cwd: path.join(baseDir, 'autoload') };
    exec(gulp('dist'), opts, cb);

    function cb(err, stdout, stderr) {
      expect(err).toBeNull();
      expect(stderr).toEqual('');
      expect(sliceLines(stdout, 0, 1)).toEqual('Loaded external module: @babel/register');
      expect(sliceLines(stdout, 4, 5)).toEqual('clean!');
      expect(sliceLines(stdout, 7, 8)).toEqual('build!');
      done(err);
    }
  });

  it('Should output error logs of autoload if fail to load module for a specified gulpfile', function(done) {
    var opts = { cwd: path.join(baseDir, 'autoload-fail') };
    exec(gulp('dist'), opts, cb);

    function cb(err, stdout, stderr) {
      expect(err).not.toBeNull();
      expect(stderr).not.toEqual('');
      expect(sliceLines(stdout, 0, 1)).toEqual('Failed to load external module: coffeescript/register');
      expect(sliceLines(stdout, 1, 2)).toMatch('Error: Cannot find module \'coffeescript/register\'');
      done();
    }
  });

});
