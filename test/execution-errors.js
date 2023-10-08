'use strict';

var expect = require('expect');
var exec = require('child_process').exec;
var path = require('path');
var os = require('os');

var tildify = require('../lib/shared/tildify');

var eraseTime = require('./tool/erase-time');
var eraseLapse = require('./tool/erase-lapse');
var sliceLines = require('./tool/slice-lines');
var cd = require('./tool/gulp-cmd').cd;

describe('execution error', function() {

  it('should output an error if a task is not defined', function(done) {
    exec(cd(__dirname, './fixtures/gulpfiles').gulp('a'), cb);

    function cb(err, stdout, stderr) {
      expect(err).not.toBeNull();
      expect(err.code).toEqual(1);
      expect(eraseTime(stdout)).toMatch('Using gulpfile ');
      expect(eraseTime(stderr)).toEqual(
        'Task never defined: a\n' +
        'To list available tasks, try running: gulp --tasks\n');
      done();
    }
  });

  it('should output an error if gulp version is unsupported', function(done) {
    exec(cd(__dirname, './fixtures/errors/bad-gulp-version').gulp(), cb);

    function cb(err, stdout, stderr) {
      expect(err).not.toBeNull();
      expect(err.code).toEqual(1);
      expect(eraseTime(stdout)).toEqual('');
      expect(eraseTime(stderr)).toEqual('Unsupported gulp version 1.2.3\n');
      done();
    }
  });

  it('should output an error if gulp is not found', function(done) {
    var tmpdir = os.tmpdir();
    if (os.platform() === 'win32') {
      var moveDrive = tmpdir.slice(0, 2) + '&';
      exec(moveDrive + cd(tmpdir).gulp(), cb);
    } else {
      exec(cd(tmpdir).gulp(), cb);
    }

    function cb(err, stdout, stderr) {
      expect(err).not.toBeNull();
      expect(err.code).toEqual(1);
      expect(sliceLines(stderr, 0, 1)).toMatch('Local gulp not found in ');
      expect(sliceLines(stderr, 1, 2)).toEqual('Try running: npm install gulp');
      done();
    }
  });

  it('should log a same error once', function(done) {
    var dir = path.join(__dirname, 'fixtures/gulpfiles');
    var gulpfileName = 'gulpfile-dedup-errorlog.js';

    exec(cd(dir).gulp(
      '--gulpfile', gulpfileName
    ), cb);

    function cb(err, stdout, stderr) {
      expect(err).not.toBeNull();
      expect(err.code).toEqual(1);
      expect(sliceLines(stdout)).toEqual(
        'Using gulpfile ' + tildify(path.join(dir, gulpfileName)) + '\n' +
        'Starting \'default\'...\n' +
        'Starting \'b\'...\n' +
        'Starting \'a\'...\n' +
      '');
      stderr = eraseLapse(eraseTime(stderr)).split(/[\r\n]+/);
      var n = stderr.length;
      expect(stderr[0]).toEqual('\'a\' errored after ?');
      expect(stderr[1]).toEqual('Error: Task \'a\' failed!');
      expect(stderr[n - 3]).toEqual('\'b\' errored after ?');
      expect(stderr[n - 2]).toEqual('\'default\' errored after ?');
      expect(stderr[n - 1]).toEqual('');
      done();
    }
  });
});
