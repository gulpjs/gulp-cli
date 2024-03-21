'use strict';

var expect = require('expect');
var exec = require('child_process').exec;
var path = require('path');
var os = require('os');

var tildify = require('../lib/shared/tildify');

var eraseTime = require('./tool/erase-time');
var eraseLapse = require('./tool/erase-lapse');
var sliceLines = require('./tool/slice-lines');
var gulp = require('./tool/gulp-cmd');

describe('execution error', function() {

  it('should output an error if a task is not defined', function(done) {
    var opts = { cwd: path.join(__dirname, './fixtures/gulpfiles') };
    exec(gulp('a'), opts, cb);

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

  it('should output an error if a task is not defined but a similar task is found', function(done) {
    var opts = { cwd: path.join(__dirname, './fixtures/gulpfiles') };
    exec(gulp('test0'), opts, cb);

    function cb(err, stdout, stderr) {
      expect(err).not.toBeNull();
      expect(err.code).toEqual(1);
      expect(eraseTime(stdout)).toMatch('Using gulpfile ');
      expect(eraseTime(stderr)).toEqual(
        'Task never defined: test0 - did you mean? test1, test2, test3, test4, test5, test6, test7, test8\n' +
        'To list available tasks, try running: gulp --tasks\n');
      done();
    }
  });

  it('should output an error if gulp version is unsupported', function(done) {
    var opts = { cwd: path.join(__dirname, './fixtures/errors/bad-gulp-version') };
    exec(gulp(), opts, cb);

    function cb(err, stdout, stderr) {
      expect(err).not.toBeNull();
      expect(err.code).toEqual(1);
      expect(eraseTime(stdout)).toEqual('');
      expect(eraseTime(stderr)).toEqual('Unsupported gulp version 1.2.3\n');
      done();
    }
  });

  it('should output an error if gulp is not found', function(done) {
    var opts = { cwd: os.tmpdir() };
    exec(gulp(), opts, cb);

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

    exec(gulp(
      '--gulpfile', gulpfileName
    ), { cwd: dir }, cb);

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
