'use strict';

var expect = require('expect');
var exec = require('child_process').exec;
var path = require('path');

var sliceLines = require('./tool/slice-lines');
var cmdSep = require('./tool/cmd-sep');

var gulpCmd = 'node ' + path.join(__dirname, '../bin/gulp.js');
var baseDir = path.join(__dirname, '..');

describe('flag: --series', function() {

  it('runs tasks in series when flag is set', function(done) {
    exec([
      'cd ' + baseDir + cmdSep,
      gulpCmd,
      'test5 test6',
      '--series',
      '--cwd ./test/fixtures/gulpfiles'
    ].join(' '), cb);

    function cb(err, stdout, stderr) {
      expect(err).toEqual(null);
      expect(stderr).toEqual('');
      expect(sliceLines(stdout, 2)).toEqual(
        'Starting \'test5\'...\n' +
        'Finished \'test5\' after ?\n' +
        'Starting \'test6\'...\n' +
        'Finished \'test6\' after ?\n' +
        ''
      );
      done();
    }
  });

  it('runs tasks in parallel when flag is not set', function(done) {
    exec([
      'cd ' + baseDir + cmdSep,
      gulpCmd,
      'test5 test6',
      '--cwd ./test/fixtures/gulpfiles',
    ].join(' '), cb);

    function cb(err, stdout, stderr) {
      expect(err).toEqual(null);
      expect(stderr).toEqual('');
      expect(stdout).toNotMatch('Starting \'anon\'');
      expect(sliceLines(stdout, 2)).toEqual(
        'Starting \'test5\'...\n' +
        'Starting \'test6\'...\n' +
        'Finished \'test6\' after ?\n' +
        'Finished \'test5\' after ?\n' +
        ''
      );
      done();
    }
  });

});
