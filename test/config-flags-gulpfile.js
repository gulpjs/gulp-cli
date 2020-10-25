'use strict';

var expect = require('expect');

var path = require('path');
var fixturesDir = path.join(__dirname, 'fixtures/config');

var headLines = require('gulp-test-tools').headLines;
var eraseTime = require('gulp-test-tools').eraseTime;
var runner = require('gulp-test-tools').gulpRunner().basedir(fixturesDir);

describe('config: flags.gulpfile', function() {

  it('Should configure with a .gulp.* file', function(done) {
    runner
      .chdir('flags/gulpfile')
      .gulp()
      .run(cb);

    function cb(err, stdout, stderr) {
      expect(err).toEqual(null);
      expect(stderr).toEqual('');
      stdout = headLines(stdout, 2, 2);
      expect(stdout).toEqual(
        'This gulpfile : ' +
          path.join(fixturesDir, 'flags/gulpfile/is/here/mygulpfile.js') +
          '\n' +
        'The current directory : ' + path.join(fixturesDir, 'flags/gulpfile')
      );
      done(err);
    }
  });

  it('Should configure with a .gulp.* file in the directory specified by ' +
  '\n\t--cwd', function(done) {
    runner
      .gulp('--cwd ./flags/gulpfile')
      .run(cb);

    function cb(err, stdout, stderr) {
      expect(err).toEqual(null);
      expect(stderr).toEqual('');
      stdout = headLines(stdout, 2, 3);
      expect(stdout).toEqual(
        'This gulpfile : ' +
          path.join(fixturesDir, 'flags/gulpfile/is/here/mygulpfile.js') +
          '\n' +
        'The current directory : ' + path.join(fixturesDir, 'flags/gulpfile')
      );
      done(err);
    }
  });

  it('Should ignore a ./gulp.* file if another directory is specified by ' +
  '\n\t--cwd', function(done) {
    runner
      .chdir('./flags/gulpfile')
      .gulp('--cwd ./cwd')
      .run(cb);

    function cb(err, stdout, stderr) {
      expect(err).toEqual(null);
      expect(stderr).toEqual('');
      stdout = headLines(stdout, 1, 3);
      expect(stdout).toEqual(
        'Another gulpfile : ' +
          path.join(fixturesDir, 'flags/gulpfile/cwd/gulpfile.js')
      );
      done(err);
    }
  });

  it('Should ignore a ./.gulp.* file if another gulpfile is specified by ' +
  '\n\t--gulpfile', function(done) {
    runner
      .chdir('./flags/gulpfile')
      .gulp('--gulpfile ./cwd/gulpfile.js')
      .run(cb);

    function cb(err, stdout, stderr) {
      expect(err).toEqual(null);
      expect(stderr).toEqual('');
      stdout = headLines(stdout, 1, 3);
      expect(stdout).toEqual(
        'Another gulpfile : ' +
          path.join(fixturesDir, 'flags/gulpfile/cwd/gulpfile.js')
      );
      done(err);
    }
  });

  it('Should overridden by cli flag: --gulpfile', function(done) {
    runner
      .chdir('./flags/gulpfile/override-by-cliflag')
      .gulp('--gulpfile mygulpfile.js')
      .run(cb);

    function cb(err, stdout, stderr) {
      expect(err).toEqual(null);
      expect(stderr).toEqual('');
      stdout = headLines(stdout, 1, 2);
      expect(stdout).toEqual('Gulpfile : ' + path.join(fixturesDir, 'flags/gulpfile/override-by-cliflag/mygulpfile.js'));
      done(err);
    }
  });

  it('Should autoload a module for loading a specified gulpfile', function(done) {
    this.timeout(0);

    runner
      .chdir('flags/gulpfile/autoload')
      .gulp('dist')
      .run(cb);

    function cb(err, stdout, stderr) {
      expect(err).toEqual(null);
      expect(stderr).toEqual('');

      var requiring = eraseTime(headLines(stdout, 1));
      expect(requiring).toEqual('Requiring external module babel-register');
      var clean = eraseTime(headLines(stdout, 1, 4));
      expect(clean).toEqual('clean!');
      var build = eraseTime(headLines(stdout, 1, 7));
      expect(build).toEqual('build!');

      done(err);
    }
  });

  it('Should autoload ts-node/register for a specified TypeScript gulpfile', function(done) {
    this.timeout(0);

    runner
      .chdir('flags/gulpfile/autoload-ts')
      .gulp('dist')
      .run(cb);

    function cb(err, stdout, stderr) {
      expect(err).toEqual(null);
      expect(stderr).toEqual('');

      var requiring = eraseTime(headLines(stdout, 1));
      expect(requiring).toEqual('Requiring external module ts-node/register');
      var clean = eraseTime(headLines(stdout, 1, 4));
      expect(clean).toEqual('clean!');
      var build = eraseTime(headLines(stdout, 1, 7));
      expect(build).toEqual('build!');

      done(err);
    }
  });

});

