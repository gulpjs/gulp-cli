'use strict';

var expect = require('expect');
var exec = require('child_process').exec;
var path = require('path');

var sliceLines = require('./tool/slice-lines');
var cmdSep = require('./tool/cmd-sep');

var gulpCmd = 'node ' + path.join(__dirname, '../bin/gulp.js');
var baseDir = path.join(__dirname, 'fixtures/config/flags/preload');

describe('config: flags.preload', function() {

  it('Should configure with an array in a .gulp.* file', function(done) {
    exec([
      'cd ' + path.join(baseDir, 'array') + cmdSep,
      gulpCmd,
    ].join(' '), cb);

    function cb(err, stdout, stderr) {
      expect(err).toEqual(null);
      expect(stderr).toEqual('');
      expect(sliceLines(stdout, 0, 1)).toEqual('Preloading external module: ./preload_one');
      expect(sliceLines(stdout, 1, 2)).toEqual('Preloaded external module: ./preload_one');
      expect(sliceLines(stdout, 2, 3)).toEqual('Preloading external module: ./preload_two');
      expect(sliceLines(stdout, 3, 4)).toEqual('Preloaded external module: ./preload_two');
      expect(sliceLines(stdout, 6, 7)).toEqual('preload one!');
      expect(sliceLines(stdout, 7, 8)).toEqual('preload two!');
      done(err);
    }
  });

  it('Should configure with a string in a .gulp.* file', function(done) {
    exec([
      'cd ' + path.join(baseDir, 'string') + cmdSep,
      gulpCmd,
    ].join(' '), cb);

    function cb(err, stdout, stderr) {
      expect(err).toEqual(null);
      expect(stderr).toEqual('');
      expect(sliceLines(stdout, 0, 1)).toEqual('Preloading external module: ./preload');
      expect(sliceLines(stdout, 1, 2)).toEqual('Preloaded external module: ./preload');
      expect(sliceLines(stdout, 4, 5)).toEqual('hello preload!');
      done(err);
    }
  });

  it('Combines --preload flag with .gulp.* file flags.require', function(done) {
    exec([
      'cd ' + path.join(baseDir, 'join-flags') + cmdSep,
      gulpCmd,
      '--preload ./preload_one',
    ].join(' '), cb);

    function cb(err, stdout, stderr) {
      expect(err).toEqual(null);
      expect(stderr).toEqual('');
      expect(sliceLines(stdout, 0, 1)).toEqual('Preloading external module: ./preload_one');
      expect(sliceLines(stdout, 1, 2)).toEqual('Preloaded external module: ./preload_one');
      expect(sliceLines(stdout, 2, 3)).toEqual('Preloading external module: ./preload_two');
      expect(sliceLines(stdout, 3, 4)).toEqual('Preloaded external module: ./preload_two');
      expect(sliceLines(stdout, 6, 7)).toEqual('preload one!');
      expect(sliceLines(stdout, 7, 8)).toEqual('preload two!');
      done(err);
    }
  });

  it('resolves relative requires against cwd', function(done) {
    exec([
      'cd ' + path.join(__dirname, 'fixtures/config') + cmdSep,
      gulpCmd,
      '--cwd flags/preload/with-cwd',
    ].join(' '), cb);

    function cb(err, stdout, stderr) {
      expect(err).toEqual(null);
      expect(stderr).toEqual('');
      expect(sliceLines(stdout, 0, 1)).toEqual('Preloading external module: ../preload');
      expect(sliceLines(stdout, 1, 2)).toEqual('Preloaded external module: ../preload');
      expect(sliceLines(stdout, 5, 6)).toEqual('hello preload!');
      done(err);
    }
  });

  it('works with absolute paths, ignoring cwd', function(done) {
    exec([
      'cd ' + path.join(__dirname, 'fixtures/config') + cmdSep,
      gulpCmd,
      '--cwd flags/preload/with-absolute',
    ].join(' '), cb);

    function cb(err, stdout, stderr) {
      expect(err).toEqual(null);
      expect(stderr).toEqual('');
      var absolute = path.join(__dirname, './fixtures/config/flags/preload/preload');
      expect(sliceLines(stdout, 0, 1)).toEqual('Preloading external module: ' + absolute);
      expect(sliceLines(stdout, 1, 2)).toEqual('Preloaded external module: ' + absolute);
      expect(sliceLines(stdout, 5, 6)).toEqual('hello preload!');
      done(err);
    }
  });
});

