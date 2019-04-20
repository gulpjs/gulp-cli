'use strict';

var expect = require('expect');
var eraseTime = require('gulp-test-tools').eraseTime;
var eraseLapse = require('gulp-test-tools').eraseLapse;
var runner = require('gulp-test-tools').gulpRunner;
var path = require('path');
var os = require('os');
var tildify = require('../lib/shared/tildify');

describe('execution error', function() {

  it('should output an error if a task is not defined', function(done) {
    runner({ verbose: false })
      .chdir('test/fixtures/gulpfiles')
      .gulp('a')
      .run(function(err, stdout, stderr) {
        expect(err).toNotEqual(null);
        expect(err.code).toEqual(1);
        expect(eraseTime(stdout)).toMatch('Using gulpfile ');
        expect(eraseTime(stderr)).toEqual(
          'Task never defined: a\n' +
          'To list available tasks, try running: gulp --tasks\n');
        done();
      });
  });

  it('should output an error if gulp version is unsupported', function(done) {
    runner({ verbose: false })
      .chdir('test/fixtures/errors/bad-gulp-version')
      .gulp()
      .run(function(err, stdout, stderr) {
        expect(err).toNotEqual(null);
        expect(err.code).toEqual(1);
        expect(eraseTime(stdout)).toEqual('');
        expect(eraseTime(stderr)).toEqual('Unsupported gulp version\n');
        done();
      });
  });

  it('should output an error if gulp is not found', function(done) {
    runner({ verbose: false })
      .chdir(os.tmpdir())
      .gulp()
      .run(function(err, stdout, stderr) {
        expect(err).toNotEqual(null);
        expect(err.code).toEqual(1);
        expect(eraseTime(stdout)).toEqual('');
        stderr = eraseTime(stderr).split(/[\r\n]+/);
        expect(stderr[0]).toMatch('Local gulp not found in ');
        expect(stderr[1]).toEqual('Try running: npm install gulp');
        done();
      });
  });

  it('should log a same error once', function(done) {
    var dir = path.join(__dirname, 'fixtures/gulpfiles');
    var gulpfileName = 'gulpfile-dedup-errorlog.js';
    runner({ verbose: false })
      .chdir(dir)
      .gulp('--gulpfile', gulpfileName)
      .run(function(err, stdout, stderr) {
        expect(err).toNotEqual(null);
        expect(err.code).toEqual(1);
        stdout = eraseLapse(eraseTime(stdout));
        expect(stdout).toEqual(
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
      });
  });
});

