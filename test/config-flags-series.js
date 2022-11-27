'use strict';

var expect = require('expect');
var exec = require('child_process').exec;
var path = require('path');

var sliceLines = require('./tool/slice-lines');
var cmdSep = require('./tool/cmd-sep');

var gulpCmd = 'node ' + path.join(__dirname, '../bin/gulp.js');
var baseDir = path.join(__dirname, 'fixtures/config/flags/series');

describe('config: flags.series', function() {

  it('Should run in series if `flags.series` is true in .gulp.*', function(done) {
    exec([
      'cd ' + path.join(baseDir, 't') + cmdSep,
      gulpCmd,
      'task1 task2',
    ].join(' '), cb);

    function cb(err, stdout, stderr) {
      expect(err).toBeNull();
      expect(stderr).toEqual('');
      expect(sliceLines(stdout, 1)).toEqual(
        'Starting \'task1\'...\n' +
        'Finished \'task1\' after ?\n' +
        'Starting \'task2\'...\n' +
        'Finished \'task2\' after ?\n' +
        ''
      );
      done();
    }
  });

  it('Should run in parallel if `flags.series` is false in .gulp.*', function(done) {
    exec([
      'cd ' + path.join(baseDir, 'f') + cmdSep,
      gulpCmd,
      'task1 task2',
    ].join(' '), cb);

    function cb(err, stdout, stderr) {
      expect(err).toBeNull();
      expect(stderr).toEqual('');
      expect(sliceLines(stdout, 1)).toEqual(
        'Starting \'task1\'...\n' +
        'Starting \'task2\'...\n' +
        'Finished \'task2\' after ?\n' +
        'Finished \'task1\' after ?\n' +
        ''
      );
      done();
    }
  });

  it('Should overridden by cli flag: --series', function(done) {
    exec([
      'cd ' + path.join(baseDir, 'f') + cmdSep,
      gulpCmd,
      '--series task1 task2',
    ].join(' '), cb);

    function cb(err, stdout, stderr) {
      expect(err).toBeNull();
      expect(stderr).toEqual('');
      expect(sliceLines(stdout, 1)).toEqual(
        'Starting \'task1\'...\n' +
        'Finished \'task1\' after ?\n' +
        'Starting \'task2\'...\n' +
        'Finished \'task2\' after ?\n' +
        ''
      );
      done();
    }
  });

  it('Should overridden by cli flag: --no-series', function(done) {
    exec([
      'cd ' + path.join(baseDir, 't') + cmdSep,
      gulpCmd,
      '--no-series task1 task2',
    ].join(' '), cb);

    function cb(err, stdout, stderr) {
      expect(err).toBeNull();
      expect(stderr).toEqual('');
      expect(sliceLines(stdout, 1)).toEqual(
        'Starting \'task1\'...\n' +
        'Starting \'task2\'...\n' +
        'Finished \'task2\' after ?\n' +
        'Finished \'task1\' after ?\n' +
        ''
      );
      done();
    }
  });
});
