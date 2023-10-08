'use strict';

var expect = require('expect');
var exec = require('child_process').exec;
var path = require('path');

var sliceLines = require('./tool/slice-lines');
var cd = require('./tool/gulp-cmd').cd;

var baseDir = path.join(__dirname, 'fixtures/config/flags/gulpfile');

describe('config: flags.gulpfile', function() {

  it('Should configure with a .gulp.* file', function(done) {
    exec(cd(baseDir).gulp(), cb);

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
    exec(cd(__dirname, 'fixtures/config').gulp('--cwd ./flags/gulpfile'), cb);

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
    exec(cd(baseDir).gulp('--cwd ./cwd'), cb);

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
    exec(cd(baseDir).gulp('--gulpfile ./cwd/gulpfile.js'), cb);

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
    exec(cd(baseDir, 'override-by-cliflag').gulp('--gulpfile mygulpfile.js'), cb);

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

    exec(cd(baseDir, 'autoload').gulp('dist'), cb);

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
    exec(cd(baseDir, 'autoload-fail').gulp('dist'), cb);

    function cb(err, stdout, stderr) {
      expect(err).not.toBeNull();
      expect(stderr).not.toEqual('');
      expect(sliceLines(stdout, 0, 1)).toEqual('Failed to load external module: coffeescript/register');
      expect(sliceLines(stdout, 1, 2)).toMatch('Error: Cannot find module \'coffeescript/register\'');
      done();
    }
  });

});
