'use strict';

var expect = require('expect');
var exec = require('child_process').exec;
var path = require('path');

var sliceLines = require('./tool/slice-lines');
var gulp = require('./tool/gulp-cmd');

var baseDir = path.join(__dirname, 'fixtures/config/flags/gulpfile');
var prjDir = path.join(baseDir, 'prj');

describe('config: gulpfile', function() {

  it('Should configure with a .gulp.* file', function(done) {
    var opts = { cwd: prjDir };
    exec(gulp(), opts, cb);

    function cb(err, stdout, stderr) {
      expect(err).toBeNull();
      expect(stderr).toEqual('');
      expect(sliceLines(stdout, 3, 5)).toEqual(
        'This gulpfile : ' + path.join(baseDir, 'is/here/gulpfile-by-prj-cfg.js') + '\n' +
        'The current directory : ' + path.join(baseDir, 'is/here')
      );
      done(err);
    }
  });

  it('Should configure with a .gulp.* file in the directory specified by --cwd', function(done) {
    var opts = { cwd: prjDir };
    exec(gulp('--cwd ../cwd'), opts, cb);

    function cb(err, stdout, stderr) {
      expect(err).toBeNull();
      expect(stderr).toEqual('');
      expect(sliceLines(stdout, 3, 5)).toEqual(
        'This gulpfile : ' + path.join(baseDir, 'is/here/gulpfile-by-cwd-cfg.js') + '\n' +
        'The current directory : ' + path.join(baseDir, 'cwd')
      );
      done(err);
    }
  });

  it('Should configure with a .gulp.* file found up', function(done) {
    var opts = { cwd: path.join(prjDir, 'findup') };
    exec(gulp(), opts, cb);

    function cb(err, stdout, stderr) {
      expect(err).toBeNull();
      expect(stderr).toEqual('');
      expect(sliceLines(stdout, 3, 5)).toEqual(
        'This gulpfile : ' + path.join(baseDir, 'is/here/gulpfile-by-prj-cfg.js') + '\n' +
        'The current directory : ' + path.join(baseDir, 'is/here')
      );
      done(err);
    }
  });

  it('Should configure with a .gulp.* file found up the directory specified by --cwd', function(done) {
    var opts = { cwd: prjDir };
    exec(gulp('--cwd ../cwd/findup'), opts, cb);

    function cb(err, stdout, stderr) {
      expect(err).toBeNull();
      expect(stderr).toEqual('');
      expect(sliceLines(stdout, 3, 5)).toEqual(
        'This gulpfile : ' + path.join(baseDir, 'is/here/gulpfile-by-cwd-cfg.js') + '\n' +
        'The current directory : ' + path.join(baseDir, 'cwd/findup')
      );
      done(err);
    }
  });

  it('Should ignore a ./gulp.* file if another directory is specified by --cwd', function(done) {
    var opts = { cwd: prjDir };
    exec(gulp('--cwd ../is/here'), opts, cb);

    function cb(err, stdout, stderr) {
      expect(err).toBeNull();
      expect(stderr).toEqual('');
      expect(sliceLines(stdout, 3, 5)).toEqual(
        'This gulpfile : ' + path.join(baseDir, 'is/here/gulpfile.js') + '\n' +
        'The current directory : ' + path.join(baseDir, 'is/here')
      );
      done(err);
    }
  });

  it('Should ignore a ./.gulp.* file if another gulpfile is specified by --gulpfile', function(done) {
    var opts = { cwd: prjDir };
    exec(gulp('--gulpfile ../is/here/gulpfile.js'), opts, cb);

    function cb(err, stdout, stderr) {
      expect(err).toBeNull();
      expect(stderr).toEqual('');
      expect(sliceLines(stdout, 3, 5)).toEqual(
        'This gulpfile : ' + path.join(baseDir, 'is/here/gulpfile.js') + '\n' +
        'The current directory : ' + path.join(baseDir, 'is/here')
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
      expect(sliceLines(stdout, 5, 6)).toEqual('clean!');
      expect(sliceLines(stdout, 8, 9)).toEqual('build!');
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

  it('Should not find up but use config file in current directory', function(done) {
    var opts = { cwd: path.join(baseDir, 'use-current-cfg/current-dir') };
    exec(gulp(), opts, cb);

    function cb(err, stdout, stderr) {
      expect(err).toBeNull();
      expect(stderr).toEqual('');
      expect(sliceLines(stdout, 2, 3)).toEqual(path.join(opts.cwd, 'gulpfile-2.js'));
      done(err);
    }
  });
});
